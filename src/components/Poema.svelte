<script lang=ts>
  const {
    titulo = "",
    autor = "Diego Rapoport",
  } : {
    titulo: string;
    autor: string;
  } = $props();
</script>

<div class="poema">
  <h2>{titulo}</h2>
  <h4>{autor}</h4>
  <slot />
</div>

<style>
  .poema {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin-top: 1rem;
    font-family: Baskerville;

    > h2 {
      margin: 0;
    }

    > h4 {
      margin: 0;
      margin-bottom: 1rem;
      font-style: italic;

      &:before {
        content: "por ";
      }
    }

    >:global(p) {
      margin: 0;
      line-height: 1.45;
    }
  }
</style>
