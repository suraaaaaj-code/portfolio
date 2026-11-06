import { useEffect, useRef, useState } from 'react';

const agents = ['Claude', 'Codex', 'Layout', 'Copy', 'Hub', 'Brands', 'Clients', 'Students', 'Stack', 'Build', 'Work', 'Connect'];
const MAX_PARALLEL_COMPONENTS = 4;
const TRAVEL_MS = 300;
const RESOLVE_MS = 380;
const RESOLVE_STAGGER_MS = 130;
const CAMERA_MS = 620;

export default function BuildExperience() {
  const [entries, setEntries] = useState([]);
  const [active, setActive] = useState(true);
  const [built, setBuilt] = useState(0);
  const [replayKey, setReplayKey] = useState(0);
  const [skipped, setSkipped] = useState(false);
  const [total, setTotal] = useState(6);
  const [cursorsVisible, setCursorsVisible] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    const blocks = [...document.querySelectorAll('[data-build-block]')];
    setTotal(blocks.length);
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || !blocks.length) {
      blocks.forEach((block) => { block.dataset.state = 'done'; block.inert = false; });
      setActive(false);
      setCursorsVisible(false);
      setBuilt(blocks.length);
      return undefined;
    }

    let cancelled = false;
    let handedOver = false;
    let skippedAll = false;
    let observer;
    let frame = 0;
    let inFlight = false;
    let draining = false;
    let wheelCount = 0;
    let wheelTimer;
    let agentIndex = 0;
    let camera = null;
    let focusBlock = blocks[0] ?? null;
    const jobs = new Map();
    const activeBlocks = new Set();
    const visibleQueue = [];
    const timeouts = new Set();
    const cursorNodes = [...(canvasRef.current?.querySelectorAll('.build-cursor') ?? [])];
    const playMode = new URLSearchParams(window.location.search).has('play');
    const scrollBehavior = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = 'auto';

    const live = () => !cancelled;
    const pause = (ms) => new Promise((resolve) => {
      const id = window.setTimeout(() => { timeouts.delete(id); resolve(); }, ms);
      timeouts.add(id);
    });
    const log = (agent, message) => setEntries((current) => [...current.slice(-3), {
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      agent,
      message,
    }]);
    const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
    const easeInOut = (value) => value < .5 ? 4 * value * value * value : 1 - Math.pow(-2 * value + 2, 3) / 2;
    const safeBand = () => ({
      top: 112,
      bottom: Math.max(220, window.innerHeight - (window.innerWidth <= 600 ? 174 : 92)),
    });
    const pageScrollLimit = () => Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    const setCameraTarget = (target, duration = CAMERA_MS) => {
      const next = clamp(target, 0, pageScrollLimit());
      if (Math.abs(next - window.scrollY) < 2) {
        camera = null;
        return false;
      }
      camera = { from: window.scrollY, to: next, started: performance.now(), duration };
      return true;
    };
    const animateCameraToBatch = async (batch) => {
      focusBlock = batch[0] ?? focusBlock;
      if (batch.length && batch.every((block) => block.closest('.site-header'))) return;
      const rects = batch.map((block) => block.getBoundingClientRect());
      const band = safeBand();
      const top = Math.min(...rects.map((rect) => rect.top));
      const bottom = Math.max(...rects.map((rect) => rect.bottom));
      const span = bottom - top;
      const targetEdge = span > band.bottom - band.top
        ? bottom - band.bottom
        : top + span / 2 - (band.top + (band.bottom - band.top) * .43);
      const target = window.scrollY + targetEdge;
      const distance = Math.abs(target - window.scrollY);
      const duration = clamp(230 + distance * .35, 260, CAMERA_MS);
      if (setCameraTarget(target, duration)) await pause(duration + 35);
    };

    const tick = (now) => {
      if (!live()) return;
      if (camera) {
        const progress = clamp((now - camera.started) / camera.duration, 0, 1);
        const position = camera.from + (camera.to - camera.from) * easeInOut(progress);
        window.scrollTo(0, position);
        if (progress >= 1) {
          window.scrollTo(0, camera.to);
          camera = null;
        }
      }

      const anchorRects = jobs.size
        ? [...jobs.values()].map((job) => job.block.getBoundingClientRect())
        : [...activeBlocks].filter((block) => block.isConnected).map((block) => block.getBoundingClientRect());
      if (!anchorRects.length && focusBlock?.isConnected) anchorRects.push(focusBlock.getBoundingClientRect());
      const anchor = anchorRects.length ? {
        x: anchorRects.reduce((sum, rect) => sum + rect.left + rect.width / 2, 0) / anchorRects.length,
        y: anchorRects.reduce((sum, rect) => sum + rect.top + rect.height / 2, 0) / anchorRects.length,
      } : { x: window.innerWidth / 2, y: window.innerHeight / 2 };

      cursorNodes.forEach((node, index) => {
        const job = jobs.get(index);
        let x;
        let y;
        if (job) {
          const rect = job.block.getBoundingClientRect();
          if (job.phase === 'mark') {
            const progress = clamp((now - job.started) / TRAVEL_MS, 0, 1);
            const eased = easeInOut(progress);
            const fromX = rect.left + rect.width * job.fromX;
            const fromY = rect.top + rect.height * job.fromY;
            const toX = rect.left + rect.width * job.toX;
            const toY = rect.top + rect.height * job.toY;
            const dx = toX - fromX;
            const dy = toY - fromY;
            const length = Math.hypot(dx, dy) || 1;
            const bow = Math.sin(Math.PI * eased) * Math.min(44, length * .045);
            x = fromX + dx * eased - (dy / length) * bow;
            y = fromY + dy * eased + (dx / length) * bow;
            node.style.setProperty('--mark-left', `${Math.min(fromX, x) - x}px`);
            node.style.setProperty('--mark-top', `${Math.min(fromY, y) - y}px`);
            node.style.setProperty('--mark-w', `${Math.abs(x - fromX)}px`);
            node.style.setProperty('--mark-h', `${Math.abs(y - fromY)}px`);
          } else {
            const drift = now / 460 + index;
            x = rect.left + rect.width * ((job.fromX + job.toX) / 2) + Math.sin(drift) * Math.min(8, rect.width * .08);
            y = rect.top + rect.height * ((job.fromY + job.toY) / 2) + Math.cos(drift) * Math.min(7, rect.height * .08);
            node.style.setProperty('--mark-left', '0px');
            node.style.setProperty('--mark-top', '0px');
            node.style.setProperty('--mark-w', '0px');
            node.style.setProperty('--mark-h', '0px');
          }
        } else {
          const orbit = now / 840 + index * (Math.PI * 2 / cursorNodes.length);
          const radiusX = Math.min(130, 35 + index % 4 * 18);
          const radiusY = Math.min(96, 25 + Math.floor(index / 4) * 20);
          x = clamp(anchor.x + Math.cos(orbit) * radiusX, 14, window.innerWidth - 52);
          y = clamp(anchor.y + Math.sin(orbit * .92) * radiusY, 88, window.innerHeight - 55);
          node.style.setProperty('--mark-left', '0px');
          node.style.setProperty('--mark-top', '0px');
          node.style.setProperty('--mark-w', '0px');
          node.style.setProperty('--mark-h', '0px');
        }
        node.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      });
      frame = requestAnimationFrame(tick);
    };

    const prepareBlock = async (block, cursorIndices) => {
      if (!live() || skippedAll || block.dataset.state === 'done') return;
      const label = block.dataset.log || block.dataset.code || 'a component';
      const started = performance.now();
      cursorIndices.forEach((cursorIndex) => {
        const column = cursorIndex % 4;
        const row = Math.floor(cursorIndex / 4);
        const fromX = column / 4;
        const toX = (column + 1) / 4;
        const fromY = row / 3;
        const toY = (row + 1) / 3;
        jobs.set(cursorIndex, { block, phase: 'mark', started, fromX, fromY, toX, toY });
        cursorNodes[cursorIndex]?.style.setProperty('--agent-label-shift', `${(column - 1.5) * 15}px ${(row - 1) * 11}px`);
        log(agents[cursorIndex], `marked ${label}`);
      });
      activeBlocks.add(block);
      block.dataset.state = 'mark';

      await pause(TRAVEL_MS);
      if (!live() || skippedAll) { cursorIndices.forEach((cursorIndex) => jobs.delete(cursorIndex)); return; }
      block.dataset.state = 'rough';
      cursorIndices.forEach((cursorIndex) => { const job = jobs.get(cursorIndex); if (job) job.phase = 'rough'; });
    };

    const finishBlock = (block, cursorIndices) => {
      if (!live() || skippedAll || block.dataset.state === 'done') return;
      const label = block.dataset.log || block.dataset.code || 'a component';
      block.dataset.state = 'done';
      block.inert = false;
      cursorIndices.forEach((cursorIndex) => jobs.delete(cursorIndex));
      activeBlocks.delete(block);
      setBuilt((count) => count + 1);
      cursorIndices.forEach((cursorIndex) => log(agents[cursorIndex], `finished ${label}`));
    };

    const assignCursors = (batch) => {
      const assignments = new Map(batch.map((block) => [block, []]));
      const unused = new Set(cursorNodes.map((_, index) => index));
      batch.forEach((block) => {
        const preferred = agents.indexOf(block.dataset.agent);
        if (preferred >= 0 && unused.has(preferred)) {
          assignments.get(block).push(preferred);
          unused.delete(preferred);
        }
      });
      [...unused].forEach((cursorIndex) => {
        const next = [...assignments.entries()].sort((a, b) => a[1].length - b[1].length)[0];
        next[1].push(cursorIndex);
      });
      return assignments;
    };

    const buildBatch = async (batch, followCamera = false) => {
      if (!batch.length || !live() || skippedAll) return;
      inFlight = true;
      activeBlocks.clear();
      batch.forEach((block) => activeBlocks.add(block));
      focusBlock = batch[0];
      setCursorsVisible(true);
      const assignments = assignCursors(batch);
      const preparation = [...assignments].map(([block, cursorIndices]) => prepareBlock(block, cursorIndices));
      if (followCamera) await Promise.all([Promise.all(preparation), animateCameraToBatch(batch)]);
      else await Promise.all(preparation);

      if (live() && !skippedAll) {
        for (const [index, [block, cursorIndices]] of [...assignments.entries()].entries()) {
          if (!live() || skippedAll) break;
          finishBlock(block, cursorIndices);
          await pause(index === assignments.size - 1 ? RESOLVE_MS : RESOLVE_STAGGER_MS);
        }
      }
      inFlight = false;
      activeBlocks.clear();
      if (handedOver) drainVisible();
    };

    const skip = () => {
      handedOver = true;
      skippedAll = true;
      camera = null;
      observer?.disconnect();
      blocks.forEach((block) => { block.dataset.state = 'done'; block.inert = false; });
      jobs.clear();
      activeBlocks.clear();
      setBuilt(blocks.length);
      setSkipped(true);
      setActive(false);
      setCursorsVisible(false);
      log('Codex', 'finished the remaining page');
    };

    const drainVisible = async () => {
      if (draining || inFlight || !handedOver) return;
      draining = true;
      while (live() && !skippedAll && visibleQueue.length) {
        const batch = [];
        while (visibleQueue.length && batch.length < MAX_PARALLEL_COMPONENTS) {
          const block = visibleQueue.shift();
          if (block.isConnected && block.dataset.state === 'empty') batch.push(block);
        }
        if (batch.length) await buildBatch(batch);
      }
      draining = false;
      if (handedOver && !visibleQueue.length && !inFlight) setCursorsVisible(false);
    };

    const handoff = () => {
      if (playMode || handedOver) return;
      handedOver = true;
      camera = null;
      document.documentElement.style.scrollBehavior = scrollBehavior;
      setActive(false);
      setCursorsVisible(true);
      observer = new IntersectionObserver((items) => {
        items.forEach(({ isIntersecting, target }) => {
          if (isIntersecting && target.dataset.state === 'empty' && !visibleQueue.includes(target)) visibleQueue.push(target);
        });
        drainVisible();
      }, { rootMargin: '0px 0px -8% 0px', threshold: .12 });
      blocks.filter((block) => block.dataset.state === 'empty').forEach((block) => observer.observe(block));
      log('Codex', 'handed control to your scroll');
    };

    const runAutoplay = async () => {
      let index = 0;
      while (live() && !handedOver && index < blocks.length) {
        while (index < blocks.length && blocks[index].dataset.state === 'done') index += 1;
        if (index >= blocks.length) break;
        const first = blocks[index];
        focusBlock = first;
        const section = first.closest('.site-header') ?? first.closest('[data-build-section]');
        const batch = [first];
        for (let cursor = index + 1; cursor < blocks.length && batch.length < MAX_PARALLEL_COMPONENTS; cursor += 1) {
          const block = blocks[cursor];
          if (block.dataset.state === 'done') continue;
          const blockSection = block.closest('.site-header') ?? block.closest('[data-build-section]');
          if (blockSection !== section) break;
          if (!section?.matches('.site-header')) {
            const rect = block.getBoundingClientRect();
            const visibleBand = safeBand();
            if (rect.top < visibleBand.top - 4 || rect.bottom > visibleBand.bottom + 4) break;
          }
          batch.push(block);
        }
        await buildBatch(batch, true);
        if (!live() || handedOver) break;
        index = blocks.findIndex((block) => block.dataset.state !== 'done');
        if (index < 0) break;
        await pause(65);
      }
      if (live() && !handedOver) {
        camera = null;
        document.documentElement.style.scrollBehavior = scrollBehavior;
        setActive(false);
        setCursorsVisible(false);
      }
    };

    blocks.forEach((block) => { block.dataset.state = 'empty'; block.inert = true; });
    frame = requestAnimationFrame(tick);
    const onSkip = () => skip();
    const onWheel = (event) => {
      if (event.deltaY !== 0) wheelCount += 1;
      clearTimeout(wheelTimer);
      if (wheelCount >= 2) handoff();
      else wheelTimer = window.setTimeout(() => { wheelCount = 0; }, 500);
    };
    const onKey = (event) => { if (['ArrowDown', 'PageDown', ' ', 'End'].includes(event.key)) handoff(); };
    let touchY = 0;
    const onTouchStart = (event) => { touchY = event.touches[0]?.clientY ?? 0; };
    const onTouchEnd = (event) => { if (Math.abs((event.changedTouches[0]?.clientY ?? touchY) - touchY) >= 60) handoff(); };
    window.addEventListener('wheel', onWheel, { passive: true });
    window.addEventListener('keydown', onKey);
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    window.addEventListener('portfolio:skip-build', onSkip);

    setActive(true);
    setCursorsVisible(true);
    setSkipped(false);
    setBuilt(0);
    setEntries([{ time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }), agent: 'Codex', message: 'started assembling the portfolio' }]);
    runAutoplay();

    return () => {
      cancelled = true;
      camera = null;
      cancelAnimationFrame(frame);
      clearTimeout(wheelTimer);
      timeouts.forEach(clearTimeout);
      observer?.disconnect();
      document.documentElement.style.scrollBehavior = scrollBehavior;
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('portfolio:skip-build', onSkip);
    };
  }, [replayKey]);

  const handleSkip = () => {
    window.dispatchEvent(new Event('portfolio:skip-build'));
    document.querySelectorAll('[data-build-block]').forEach((block) => { block.dataset.state = 'done'; block.inert = false; });
    setBuilt(document.querySelectorAll('[data-build-block]').length);
    setSkipped(true);
    setActive(false);
    setCursorsVisible(false);
    setEntries((items) => [...items.slice(-3), { time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }), agent: 'Codex', message: 'finished the remaining page' }]);
  };

  const handleRebuild = () => {
    setEntries([]);
    setBuilt(0);
    setActive(true);
    setCursorsVisible(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setReplayKey((key) => key + 1);
  };

  return <>
    <div className={`build-canvas${cursorsVisible ? ' is-visible' : ''}`} ref={canvasRef} aria-hidden="true">
      {agents.map((agent, index) => <span className={`build-cursor build-cursor--${index % 3}`} key={agent}>
        <svg viewBox="0 0 18 22"><path d="M2 1v17l4.8-4.5 3.1 6.2 3-1.5-3.2-6.1 6.1-.5L2 1z" /></svg><b>{agent}</b>
      </span>)}
    </div>
    <aside className={`build-console${active ? ' is-active' : ''}`} aria-live="polite">
      <div className="build-console-top"><span className="build-live-dot" /><span>{active ? 'PAGE IN PROGRESS' : skipped || built === total ? 'ALL BLOCKS COMPLETE' : 'BUILD SEQUENCE'}</span><b>{String(built).padStart(2, '0')} / {String(total).padStart(2, '0')}</b></div>
      <div className="build-log" aria-label="Build activity log">{entries.slice(-2).map((entry, index) => <p key={`${entry.time}-${index}`}><time>{entry.time}</time> <b>{entry.agent}</b> {entry.message}</p>)}</div>
      <div className="build-actions"><button type="button" onClick={handleRebuild}>↺ Rebuild</button><button type="button" onClick={handleSkip}>Skip build ↗</button></div>
    </aside>
  </>;
}
