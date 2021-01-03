<script>
	import Chart from './Chart.svelte';
	//import StocksData from './StocksData.svelte';
	import SearchBox from "./SearchBox.svelte";
	import { stocksList } from './stores.js';

	let stocksWatchList= new Array();

	stocksList.subscribe(v => { stocksWatchList=v});

	stocksList.set(["TSLA", "MSFT", "GOOGL"]);

	function handleCreateChartMessage(event){
		console.log(`ev ${event.detail}`);
		stocksList.update(data=> [...data, event.detail]);
	}

</script>

<main>
	<header>
	<img src="/favicon.png" alt="StocksDog logo" width=100px>
	<SearchBox on:createChart={handleCreateChartMessage}></SearchBox>
</header>
	<div id="chartsContainer">
	{#each stocksWatchList as stock, idx}
	<div class="chartClass">
		<p>{stock}</p>
		<Chart chartId={idx} stockName={stock}/>
	</div>
	{/each}
	</div>
</main>

<style>
	main{
		display:inline-block;
	}
	header{
		display:inline;
	}
	#chartsContainer{
		display: flex;
		flex-flow: row wrap;
		justify-content: space-evenly;
		width:100vw;
	}
	.chartClass{
		flex-basis: 45vw;
	}
</style>