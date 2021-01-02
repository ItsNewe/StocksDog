<script>
	import Chart from './Chart.svelte';
	//import StocksData from './StocksData.svelte';
	import SearchBox from "./SearchBox.svelte";
	import { stocksList } from './stores.js';

	let stocksWatchList= new Array();

	stocksList.subscribe(v => { stocksWatchList=v});

	stocksList.set(["TSLA", "MSFT"]);

	function handleCreateChartMessage(event){
		console.log(`ev ${event.detail}`);
		stocksList.update(data=> [...data, event.detail]);
	}

</script>

<main>
	<SearchBox on:createChart={handleCreateChartMessage}></SearchBox>
	{#each stocksWatchList as stock, idx}
	<p>{stock}</p>
		<Chart chartId={idx} stockName={stock}/>
	{/each}
</main>