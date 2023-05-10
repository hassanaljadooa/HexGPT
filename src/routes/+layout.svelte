<script>
	import Header from './Header.svelte';
	import './styles.css';
	import Footer from './Footer.svelte';
</script>

<div class="flex flex-col min-h-screen">
	<div>
		<Header />
	</div>

	<div class="w-full p-6  flex-grow">
		<slot />
	</div>
	<div>
		<Footer />
	</div>
</div>
