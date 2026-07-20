<script>
  import { onMount } from "svelte";
  import { hasBadge, awardBadge } from "../lib/medalhadas.js";
  import sartreimg from "../assets/sartre.png";
  import treasure from "../assets/TreasureChest.png";

  let { children } = $props();
  let show = $state(false);
  let celebrating = $state(false);
  let popoverEl = $state(null);
  let particles = $state([]);
  const badgeAward = "sartre";

  function handleClick() {
    if (celebrating) return;
    celebrating = true;
    awardBadge(badgeAward);

    const colors = ["#ffd93d","#ff6b6b","#6bcb77","#4d96ff","#ff6b9d","#c44dff","#ff9f43","#00d2d3"];
    particles = Array.from({ length: 18 }, (_, i) => ({
      x: -70 + Math.random() * 140,
      y: -(50 + Math.random() * 160),
      s: 4 + Math.random() * 10,
      c: colors[i % colors.length],
      d: Math.random() * 0.35,
      r: Math.random() * 720 - 360,
      shape: Math.random() > 0.5 ? "circle" : "square",
    }));

    requestAnimationFrame(() => {
      if (popoverEl) {
        popoverEl.showPopover();
        setTimeout(() => {
          if (popoverEl.matches(":popover-open")) popoverEl.hidePopover();
        }, 4000);
      }
    });

    setTimeout(() => { show = false; }, 2500);
    setTimeout(() => { celebrating = false; }, 4500);
  }

  onMount(() => {
    if (!hasBadge(badgeAward)) show = true;
  });
</script>

<span class="sartre-wrapper" class:celebrating>
  <a href="https://en.wikipedia.org/wiki/Jean-Paul_Sartre">{@render children()}</a>
{#if show}
  <img src={sartreimg.src} alt="Jean-Paul Sartre" class="sartre-img" />
  <img src={treasure.src} alt="Medalha" class="treasure" onclick={handleClick} />
  {#if celebrating}
    {#each particles as p, i}
      <span
        class="particle"
        class:square={p.shape === "square"}
        style="--x:{p.x}px;--y:{p.y}px;--s:{p.s}px;--c:{p.c};--d:{p.d}s;--r:{p.r}deg"
      ></span>
    {/each}
  {/if}
{/if}
</span>

{#if celebrating}
  <div bind:this={popoverEl} id="badge-popover" popover="manual">
    🏅 Medalha desbloqueada!<br />
    <strong>Jean-Paul Sartre</strong>
  </div>
{/if}

<style>
  .sartre-wrapper {
    position: relative;
    display: inline;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  .treasure {
    display: none;
    position: absolute;
    width: 9px;
    bottom: 393%;
    left: 49%;
    transform: translateX(-50%);
    z-index: 11;
    cursor: pointer;
  }

  .sartre-img {
    display: none;
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    width: 15rem;
    border-radius: .5rem;
    box-shadow: 0 4px 16px rgba(0,0,0,.35);
    z-index: 10;
    transition: box-shadow .5s;
  }

  .sartre-wrapper:hover .sartre-img,
  .sartre-wrapper.celebrating .sartre-img {
    display: block;
  }

  .sartre-wrapper:hover .treasure,
  .sartre-wrapper.celebrating .treasure {
    display: block;
  }

  .sartre-wrapper.celebrating .sartre-img {
    box-shadow: 0 0 24px rgba(255, 217, 61, .5);
  }

  .sartre-wrapper.celebrating .treasure {
    animation: chest-pop .6s ease-out forwards;
    pointer-events: none;
  }

  @keyframes chest-pop {
    0% { transform: translateX(-50%) scale(1); opacity: 1; }
    25% { transform: translateX(-50%) scale(1.3) rotate(-10deg); }
    50% { transform: translateX(-50%) scale(1.6) rotate(10deg); }
    75% { transform: translateX(-50%) scale(1.8) rotate(-5deg); opacity: .6; }
    100% { transform: translateX(-50%) scale(2.2) rotate(0); opacity: 0; }
  }

  .particle {
    position: absolute;
    left: 49%;
    bottom: 393%;
    width: var(--s);
    height: var(--s);
    background: var(--c);
    border-radius: 50%;
    z-index: 12;
    pointer-events: none;
    animation: burst .9s var(--d) ease-out forwards;
    opacity: 0;
  }

  .particle.square {
    border-radius: 2px;
  }

  @keyframes burst {
    0% { opacity: 1; transform: translate(0, 0) rotate(0deg) scale(1); }
    100% { opacity: 0; transform: translate(var(--x), var(--y)) rotate(var(--r)) scale(.3); }
  }

  #badge-popover {
    position: fixed;
    inset: unset;
    top: 30%;
    left: 50%;
    transform: translateX(-50%);
    margin: 0;
    border: 2px solid #ffd93d;
    border-radius: .75rem;
    padding: 1rem 1.5rem;
    background: linear-gradient(135deg, #1a1a2e, #16213e);
    color: #ffd93d;
    font-family: 'BioRhyme', serif;
    font-size: 1.1rem;
    text-align: center;
    line-height: 1.6;
    box-shadow: 0 0 32px rgba(255, 217, 61, .3);
    animation: pop-in .35s cubic-bezier(.175,.885,.32,1.275);

    strong {
      color: #fff;
    }
  }

  @keyframes pop-in {
    0% { transform: translateX(-50%) scale(.5); opacity: 0; }
    100% { transform: translateX(-50%) scale(1); opacity: 1; }
  }
</style>
