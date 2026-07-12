<script lang="ts">
  let {
    title = "",
    content = "",
    placement = "top",
  }: {
    title?: string;
    content?: string;
    placement?: "top" | "bottom" | "left" | "right";
  } = $props();
</script>

<span class="info-balloon">
  <slot />
  <span class="tooltip {placement}">
    {#if title}
      <span class="title">{title}</span>
      <br>
    {/if}
    {#if content}
      <span class="content">{@html content}</span>
    {/if}
  </span>
</span>

<style>
  .info-balloon {
    cursor: help;
  }

  .tooltip {
    position: absolute;
    z-index: 50;
    pointer-events: none;
    border: 1px solid #e2e8f0;
    border-radius: 0.5rem;
    padding: .5rem;
    font-family: system-ui, sans-serif;
    font-size: 0.9rem;
    color: #334155;
    line-height: 1.5;
    min-width: 160px;
    max-width: 280px;
    opacity: 0;
    visibility: hidden;
    transition:
      opacity 1000ms ease,
      visibility 200ms ease;
  }

  .info-balloon:hover .tooltip {
    opacity: 1;
    visibility: visible;
    background-color: #fff;
  }

  .tooltip::after {
    content: "";
    position: absolute;
    border: 5px solid transparent;
  }

  .title {
    font-weight: 600;
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: #94a3b8;
  }

  .content {
    color: #334155;
  }

  .top {
    top: 5%;
    left: 50%;
    transform: translateX(-50%);
  }

  .top::before {
    margin-left: -6px;
    border-top-color: #e2e8f0;
  }

  .top::after {
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-top-color: #fff;
  }

  .bottom {
    top: calc(100% + 8px);
    left: 50%;
    transform: translateX(-50%);
  }

  .bottom::before {
    bottom: 100%;
    left: 50%;
    margin-left: -6px;
    border-bottom-color: #e2e8f0;
  }

  .bottom::after {
    bottom: 100%;
    left: 50%;
    margin-left: -5px;
    border-bottom-color: #fff;
  }

  .left {
    right: calc(100% + 8px);
    top: 50%;
    transform: translateY(-50%);
  }

  .left::before {
    left: 100%;
    top: 50%;
    margin-top: -6px;
    border-left-color: #e2e8f0;
  }

  .left::after {
    left: 100%;
    top: 50%;
    margin-top: -5px;
    border-left-color: #fff;
  }

  .right {
    left: calc(100% + 8px);
    top: 50%;
    transform: translateY(-50%);
  }

  .right::before {
    right: 100%;
    top: 50%;
    margin-top: -6px;
    border-right-color: #e2e8f0;
  }

  .right::after {
    right: 100%;
    top: 50%;
    margin-top: -5px;
    border-right-color: #fff;
  }
</style>
