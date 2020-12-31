<script>
	import Chart from './Chart.svelte';
	//import StocksData from './StocksData.svelte';
	import { stocksList } from './stores.js';
	let stocksWatchList= new Array();

	stocksList.subscribe(v => { stocksWatchList=v});

	stocksList.set(["TSLA", "MSFT"]);

</script>

<main>
	
	{#each stocksWatchList as stock, idx}
		<Chart chartId={idx} stockName={stock}/>
	{/each}
</main>