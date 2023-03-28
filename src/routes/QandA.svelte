<script>
    // answers are html elements encoded with base64
    let qa = [
        {
            question: "What is HexGPT?",
            answer: "PGRpdiBjbGFzcz0ibXktMiBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciI+Cgk8ZGl2IGNsYXNzPSJiZy13aGl0ZSByb3VuZGVkLWxnIHNoYWRvdy1sZyBwLTggdy1mdWxsIG1heC13LTJ4bCBzcGFjZS15LTgiPgoJCTxkaXYgY2xhc3M9InRleHQtY2VudGVyIj4KCQkJPHAgY2xhc3M9InRleHQtZ3JheS02MDAiPgoJCQkJSGV4R1BUIGlzIGEgdXNlciBpbnRlcmZhY2UgZGVzaWduZWQgdG8gbWFrZSBpdCBlYXNpZXIgdG8gdXNlIEFJIChHUFQtMy41LVR1cmJvKSB0byBnZW5lcmF0ZSBjb2xvciBwYWxsZXRzIGJhc2VkIG9uIGEgdGV4dCBkZXNjcmlwdGlvbiAoR1BUIHByb21wdCksIHRoaXMgcHJvdmlkZXMgdXNlcnMgd2l0aCBhbiBlYXN5IGFuZCBjb252ZW5pZW50IHRvIGdlbmVyYXRlIGNvbG9yIHBhbGxldHMgdGhhdCBhZGhlcmUgdG8gc3BlY2lmaWMgZGVzaWduIGd1aWRlbGluZXMgd2l0aG91dCBzcGVuZGluZyBjb3BpdXMgYW1vdW50cyBvZiB0aW1lIG1hbnVhbGx5IHNlbGVjdGluZyBlYWNoIGNvbG9yLiBUaGUgdXNlciBoYXMgbmVhciBmdWxsIGNvbnRyb2wgb3ZlciB0aGUgdGhlbWUgb2YgcGFsbGV0LCBob3cgbWFueSBjb2xvcnMgdGhlIHBhbGxldCBjb21wcmlzZXMsIGV0Yy4KCQkJPC9wPgoJCTwvZGl2PgoKCQk8ZGl2IGNsYXNzPSJiZy1ncmF5LTIwMCByb3VuZGVkLWxnIHAtNCI+CgkJCTxoMiBjbGFzcz0idGV4dC0yeGwgZm9udC1zZW1pYm9sZCB0ZXh0LWdyYXktODAwIG1iLTQiPkhlcmUgYXJlIHNvbWUgZXhhbXBsZSBwcm9tcHRzPC9oMj4KCQkJPHVsIGNsYXNzPSJsaXN0LWRpc2MgcGwtNiBzcGFjZS15LTIiPgoJCQkJPGxpIGNsYXNzPSJ0ZXh0LWdyYXktODAwIj5HZW5lcmF0ZSBhIGNvbG9yIHBhbGxldCB0aGF0IHdvdWxkIGxvb2sgZ29vZCBhcyBhbiBhY2NlbnQgaW4gYSBmdXR1cmlzdGljIGRlc2lnbjwvbGk+CgkJCQk8bGkgY2xhc3M9InRleHQtZ3JheS04MDAiPkNyZWF0ZSBhIGNvbG9yIHBhbGxldCB0aGF0IHdvdWxkIGJlIHBlcmZlY3QgZm9yIGEgdmludGFnZS10aGVtZWQgd2VkZGluZzwvbGk+CgkJCQk8bGkgY2xhc3M9InRleHQtZ3JheS04MDAiPkNyZWF0ZSBhIGNvbG9yIHBhbGxldCB0aGF0IHJlcHJlc2VudHMgdGhlIGZlZWxpbmcgb2YgZXhjaXRlbWVudCBhbmQgZW5lcmd5LjwvbGk+CgkJCTwvdWw+CgkJPC9kaXY+Cgk8L2Rpdj4KPC9kaXY+"
        },
        {
            question: 'How is this different from a typical color pallet generator?',
            answer:
                'PGRpdiBjbGFzcz0ibXktMiBiZy1ncmF5LTEwMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciI+Cgk8ZGl2IGNsYXNzPSJiZy13aGl0ZSByb3VuZGVkLWxnIHNoYWRvdy1sZyBwLTggdy1mdWxsIG1heC13LTJ4bCBzcGFjZS15LTgiPgoJCTxkaXYgY2xhc3M9InRleHQtY2VudGVyIj4KCQkJPHAgY2xhc3M9InRleHQtZ3JheS02MDAiPgoJCQkJSW4gdGhlIHNpbXBsZXN0IHRlcm1zIEEgdHlwaWNhbCBjb2xvciBnZW5lcmF0b3Igd2lsbCB1dGlsaXplIHJhbmRvbW5lc3MgdG8gZ2VuZXJhdGUgYSBwYWxsZXQgb2YgY29sb3JzLCBob3dldmVyIEhleEdQVCB1c2VzIEFJIChHUFQtMy41LVR1cmJvKSB0byBnZW5lcmF0ZSB0aGUgY29sb3JzIGJhc2VkIG9uIGEgdGV4dCBkZXNjcmlwdGlvbiBvZiB3aGF0IHRoZSB1c2VyIGlzIGxvb2tpbmctLWkuZSAgR2VuZXJhdGUgYSBjeWJlcnB1bmsgdGhlbWVkIGNvbG9yIHBhbGxldC4gVGhpcyBoYXMgdGhlIGFkZGVkIGJlbmVmaXQgb2YgZ3JhbnVsYXIgY29udHJvbCBvdmVyIHRoZSBjb2xvciBwaWNraW5nIHByb2Nlc3MsIHdoaWxlIGF0IHRoZSBzYW1lIHRpbWUgYmVpbmcgdGltZSBlZmZlY3RpdmUuIAoJCQk8L3A+CgkJPC9kaXY+Cgk8L2Rpdj4KPC9kaXY+'
        },
        {
            question: 'Is HexGPT Open Source?',
            answer:
                'PGRpdiBjbGFzcz0ibXktMiBiZy1ncmF5LTEwMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciI+Cgk8ZGl2IGNsYXNzPSJiZy13aGl0ZSByb3VuZGVkLWxnIHNoYWRvdy1sZyBwLTggdy1mdWxsIG1heC13LTJ4bCBzcGFjZS15LTgiPgoJCTxkaXYgY2xhc3M9InRleHQtY2VudGVyIj4KCQkJPHAgY2xhc3M9InRleHQtZ3JheS02MDAiPgoJCQkJWWVzLCBIZXhHUFQgaXMgZnVsbHkgb3BlbiBzb3VyY2UgYW5kIGFueW9uZSBpcyBlbmNvdXJnZWQgdG8gcnVuIHRoZWlyIG93biBpbnN0YW5jZSBvZiBpdCBpZiB0aGV5IGRlc2lyZSBvciBpbXByb3ZlIHVwb24gaXQuIElmIHlvdSBkbyBkZWNpZGUgdG8gY29udHJpYnV0ZSB0byB0aGUgcHJvamVjdCwgSSBhc2sgdGhhdCB5b3UgaW50dXJuIG1ha2UgeW91ciBjb250cmlidXRpb24gb3BlbiBzb3VyY2UsIGhvd2V2ZXIgdGhhdCdzIG5vdCBhIHJlcXVpcmVtZW50IHBlciB0aGUgTUlUIGxpY2Vuc2UuCgkJCTwvcD4KCQk8L2Rpdj4KCTwvZGl2Pgo8L2Rpdj4='
        },
        {
            question: 'Is HexGPT Free?',
            answer:
                'PGRpdiBjbGFzcz0ibXktMiBiZy1ncmF5LTEwMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciI+Cgk8ZGl2IGNsYXNzPSJiZy13aGl0ZSByb3VuZGVkLWxnIHNoYWRvdy1sZyBwLTggdy1mdWxsIG1heC13LTJ4bCBzcGFjZS15LTgiPgoJCTxkaXYgY2xhc3M9InRleHQtY2VudGVyIj4KCQkJPHAgY2xhc3M9InRleHQtZ3JheS02MDAiPgoJCQkJaGV4Z3B0Lnh5eiB3aWxsIGJlIGZyZWUgZm9yIGFzIGxvbmcgYXMgaXQgaXMgbm90IGEgaHVnZSBmaW5hbmNpYWwgYnVyZGVuLCBJIGNhbid0IG1ha2UgYW55IGd1YXJhbnRlZXMsIGJ1dCB0aGF0IGlzIHRoZSBnb2FsLgoJCQk8L3A+CgkJPC9kaXY+Cgk8L2Rpdj4KPC9kaXY+'
        }
    ];
</script>

<div class="flex items-center justify-center w-full">
    <div class="bg-white rounded-lg shadow-lg p-8 w-full max-w-6xl space-y-4">
        <div class="text-center">
            <h1 class="text-3xl font-bold text-gray-800 mb-4">Qustions & Answers</h1>
        </div>

        {#each qa as i}
            <div tabindex="0" class="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box">
                <div class="collapse-title text-xl font-medium">
                    {i.question}
                </div>
                <div class="collapse-content">
                    <p>{@html atob(i.answer)}</p>
                </div>
            </div>
        {/each}
    </div>
</div>
