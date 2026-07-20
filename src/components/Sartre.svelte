<script>
  import { onMount } from "svelte";
  import { hasBadge, awardBadge } from "../lib/medalhadas.js";
  import sartreimg from "../assets/sartre.png";
  import treasure from "../assets/TreasureChest.png";

  let { children } = $props();
  let show = $state(false);
  const badgeAward = "sartre";

  function handleClick() {
    awardBadge(badgeAward);
  }

  onMount(() => {
    if (!hasBadge(badgeAward)) show = true;
  });
</script>

<span class="sartre-wrapper">
  <a href="https://en.wikipedia.org/wiki/Jean-Paul_Sartre">{@render children()}</a>
{#if show}
  <img src={sartreimg.src} alt="Jean-Paul Sartre" class="sartre-img" />
  <img src={treasure.src} alt="Medalha" class="treasure" onclick={handleClick} />
{/if}
</span>

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
  }

  .sartre-wrapper:hover .sartre-img {
    display: block;
  }

  .sartre-wrapper:hover .treasure {
    display: block;
  }
</style>
