<script>
  import { onMount } from "svelte";

  let drumkitEl = $state(null);
  let tooltipEl = $state(null);
  let show = $state(false);
  let clickCount = $state(0);

  const badgeKey = "badgeSystem";
  const badgeAward = "drumkit";

  onMount(() => {
    const earned = localStorage.getItem(badgeKey) === badgeAward;
    if (!earned) show = true;
  });

  $effect(() => {
    if (!drumkitEl || !tooltipEl) return;

    const key = "drumkit-tooltip-seen";
    if (!localStorage.getItem(key)) {
      drumkitEl.addEventListener("mouseenter", () => {
        const rect = drumkitEl.getBoundingClientRect();
        tooltipEl.style.left = `${rect.right + 8}px`;
        tooltipEl.style.top = `${rect.top - 10}px`;
        tooltipEl.showPopover();
        localStorage.setItem(key, "true");
        setTimeout(() => {
          if (tooltipEl.matches(":popover-open")) tooltipEl.hidePopover();
        }, 4000);
      }, { once: true });
    }

    drumkitEl.addEventListener("click", () => {
      clickCount++;
      if (clickCount === 42) {
        localStorage.setItem(badgeKey, badgeAward);
        console.log("🎉 WOW!! Você encontrou uma surpresinha!");
      }
    });
  });
</script>

{#if show}
  <div bind:this={drumkitEl} id="drumkit"></div>
  <div bind:this={tooltipEl} id="drumkit-tooltip" popover="manual">
    <p>🎉 WOW!! Você encontrou uma surpresinha!</p>
    <p>Continue procurando, você pode achar mais 🧐</p>
  </div>
{/if}

<style>
  #drumkit {
    position: absolute;
    width: 2px;
    height: 2px;
    background-image: url('src/assets/Drumkit.png');
    background-size: 100% 100%;
    left: 15.2rem;
    top: 13rem;

    &:hover {
      width: 9rem;
      height: 5rem;
    }
  }

  #drumkit-tooltip {
    position: fixed;
    inset: unset;
    margin: 0;
    border: none;
    border-radius: .5rem;
    padding: .75rem 1rem;
    background: #1f2937;
    color: #fff;
    font-family: 'BioRhyme', serif;
    font-size: .875rem;
    max-width: 220px;
    line-height: 1.5;
    box-shadow: 0 4px 16px rgba(0,0,0,.35);

    p {
      margin: 0;
    }

    p + p {
      margin-top: .35rem;
    }
  }
</style>
