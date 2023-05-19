<script>
	// answers are html elements encoded with base64
	let qa = [
		{
			question: 'What is HexGPT?',
			answer:
				'CgkJPGRpdiBjbGFzcz0idGV4dC1jZW50ZXIiPgoJCQk8cCBjbGFzcz0idGV4dC1ncmF5LTYwMCI+CgkJCQlIZXhHUFQgaXMgYSB1c2VyIGludGVyZmFjZSBkZXNpZ25lZCB0byBtYWtlIGl0IGVhc2llciB0byB1c2UgQUkgKEdQVC0zLjUtVHVyYm8pIHRvIGdlbmVyYXRlIGNvbG9yIHBhbGxldHMgYmFzZWQgb24gYSB0ZXh0IGRlc2NyaXB0aW9uIChHUFQgcHJvbXB0KSwgdGhpcyBwcm92aWRlcyB1c2VycyB3aXRoIGFuIGVhc3kgYW5kIGNvbnZlbmllbnQgdG8gZ2VuZXJhdGUgY29sb3IgcGFsbGV0cyB0aGF0IGFkaGVyZSB0byBzcGVjaWZpYyBkZXNpZ24gZ3VpZGVsaW5lcyB3aXRob3V0IHNwZW5kaW5nIGNvcGl1cyBhbW91bnRzIG9mIHRpbWUgbWFudWFsbHkgc2VsZWN0aW5nIGVhY2ggY29sb3IuIFRoZSB1c2VyIGhhcyBuZWFyIGZ1bGwgY29udHJvbCBvdmVyIHRoZSB0aGVtZSBvZiBwYWxsZXQsIGhvdyBtYW55IGNvbG9ycyB0aGUgcGFsbGV0IGNvbXByaXNlcywgZXRjLgoJCQk8L3A+CgkJPC9kaXY+CgoJCTxkaXYgY2xhc3M9ImJnLWdyYXktMjAwIHJvdW5kZWQtbGcgcC00Ij4KCQkJPGgyIGNsYXNzPSJ0ZXh0LTJ4bCBmb250LXNlbWlib2xkIHRleHQtZ3JheS04MDAgbWItNCI+SGVyZSBhcmUgc29tZSBleGFtcGxlIHByb21wdHM8L2gyPgoJCQk8dWwgY2xhc3M9Imxpc3QtZGlzYyBwbC02IHNwYWNlLXktMiI+CgkJCQk8bGkgY2xhc3M9InRleHQtZ3JheS04MDAiPkdlbmVyYXRlIGEgY29sb3IgcGFsbGV0IHRoYXQgd291bGQgbG9vayBnb29kIGFzIGFuIGFjY2VudCBpbiBhIGZ1dHVyaXN0aWMgZGVzaWduPC9saT4KCQkJCTxsaSBjbGFzcz0idGV4dC1ncmF5LTgwMCI+Q3JlYXRlIGEgY29sb3IgcGFsbGV0IHRoYXQgd291bGQgYmUgcGVyZmVjdCBmb3IgYSB2aW50YWdlLXRoZW1lZCB3ZWRkaW5nPC9saT4KCQkJCTxsaSBjbGFzcz0idGV4dC1ncmF5LTgwMCI+Q3JlYXRlIGEgY29sb3IgcGFsbGV0IHRoYXQgcmVwcmVzZW50cyB0aGUgZmVlbGluZyBvZiBleGNpdGVtZW50IGFuZCBlbmVyZ3kuPC9saT4KCQkJPC91bD4KCQk8L2Rpdj4='
		},
		{
			question: 'How is this different from a typical color pallet generator?',
			answer:
				'PHA+SW4gdGhlIHNpbXBsZXN0IHRlcm1zIEEgdHlwaWNhbCBjb2xvciBnZW5lcmF0b3Igd2lsbCB1dGlsaXplIHJhbmRvbW5lc3MgdG8gZ2VuZXJhdGUgYSBwYWxsZXQgb2YgY29sb3JzLCBob3dldmVyIEhleEdQVCB1c2VzIEFJIChHUFQtMy41LVR1cmJvKSB0byBnZW5lcmF0ZSB0aGUgY29sb3JzIGJhc2VkIG9uIGEgdGV4dCBkZXNjcmlwdGlvbiBvZiB3aGF0IHRoZSB1c2VyIGlzIGxvb2tpbmctLWkuZSAgR2VuZXJhdGUgYSBjeWJlcnB1bmsgdGhlbWVkIGNvbG9yIHBhbGxldC4gVGhpcyBoYXMgdGhlIGFkZGVkIGJlbmVmaXQgb2YgZ3JhbnVsYXIgY29udHJvbCBvdmVyIHRoZSBjb2xvciBwaWNraW5nIHByb2Nlc3MsIHdoaWxlIGF0IHRoZSBzYW1lIHRpbWUgYmVpbmcgdGltZSBlZmZlY3RpdmUuPC9wPg=='
		},
		{
			question: 'Is HexGPT Open Source?',
			answer:
				'PHAgY2xhc3M9InRleHQtZ3JheS02MDAiPgoJCQkJWWVzLCBIZXhHUFQgaXMgZnVsbHkgb3BlbiBzb3VyY2UgYW5kIGFueW9uZSBpcyBlbmNvdXJnZWQgdG8gcnVuIHRoZWlyIG93biBpbnN0YW5jZSBvZiBpdCBpZiB0aGV5IGRlc2lyZSBvciBpbXByb3ZlIHVwb24gaXQuIElmIHlvdSBkbyBkZWNpZGUgdG8gY29udHJpYnV0ZSB0byB0aGUgcHJvamVjdCwgSSBhc2sgdGhhdCB5b3UgaW50dXJuIG1ha2UgeW91ciBjb250cmlidXRpb24gb3BlbiBzb3VyY2UsIGhvd2V2ZXIgdGhhdCdzIG5vdCBhIHJlcXVpcmVtZW50IHBlciB0aGUgTUlUIGxpY2Vuc2UuCgkJCTwvcD4='
		},
		{
			question: 'Is HexGPT Free?',
			answer:
				'PHAgY2xhc3M9InRleHQtZ3JheS02MDAiPgoJCQkJaGV4Z3B0Lnh5eiB3aWxsIGJlIGZyZWUgZm9yIGFzIGxvbmcgYXMgaXQgaXMgbm90IGEgaHVnZSBmaW5hbmNpYWwgYnVyZGVuLCBJIGNhbid0IG1ha2UgYW55IGd1YXJhbnRlZXMsIGJ1dCB0aGF0IGlzIHRoZSBnb2FsLgoJCQk8L3A+'
		}
	];
</script>


	<div class="max-w-8xl space-y-2xl rounded-lg">
		<div class="text-center bg-gray-200 rounded-t-lg p-4 border-b-2">
			<h2 class="text-2xl font-semibold text-black">Frequently Asked Questions</h2>
		</div>
		<div class="bg-white shadow-x p-4 rounded-b-lg">
			<div>
				<div class="">
					{#each qa as { question, answer }}
						<div class="accordion accordion-arrow mb-4">
							<div class="accordion-header bg-gray-200 rounded-t-lg p-4 border">
								<div class="flex-1">
									<h2 class="text-xl font-medium text-gray-800 text-center">{question}</h2>
								</div>
							</div>
							<div class="accordion-body">
								<div class="flex items-center justify-center">
									<div class="bg-white-100 rounded-b-lg shadow-lg p-4 w-full max-w-2xl space-y-8">
										<p class="text-gray-600 text-center">
											{@html atob(answer)}
										</p>
									</div>
								</div>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>