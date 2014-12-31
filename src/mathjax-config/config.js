MathJax.Hub.Config({
	config: ["MMLorHTML.js"],
	jax: ["input/TeX", "input/MathML", "output/HTML-CSS", "output/NativeMML"],
	extensions: ["tex2jax.js", "mml2jax.js", "MathMenu.js", "MathZoom.js"],
	TeX: {
		extensions: ["AMSmath.js", "AMSsymbols.js", "noErrors.js", "noUndefined.js"]
	},
	skipStartupTypeset: true
})

MathJax.Ajax.loadComplete("file:///D:/neve/src/mathjax-config/config.js");