/*
	Spectral by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$wrapper = $('#page-wrapper'),
		$banner = $('#banner'),
		$header = $('#header');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ null,      '480px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Mobile?
		if (browser.mobile)
			$body.addClass('is-mobile');
		else {

			breakpoints.on('>medium', function() {
				$body.removeClass('is-mobile');
			});

			breakpoints.on('<=medium', function() {
				$body.addClass('is-mobile');
			});

		}

	// Scrolly.
		$('.scrolly')
			.scrolly({
				speed: 1500,
				offset: $header.outerHeight()
			});

	// Menu.
		$('#menu')
			.append('<a href="#menu" class="close"></a>')
			.appendTo($body)
			.panel({
				delay: 500,
				hideOnClick: true,
				hideOnSwipe: true,
				resetScroll: true,
				resetForms: true,
				side: 'right',
				target: $body,
				visibleClass: 'is-menu-visible'
			});

	// Header.
		if ($banner.length > 0
		&&	$header.hasClass('alt')) {

			$window.on('resize', function() { $window.trigger('scroll'); });

			$banner.scrollex({
				bottom:		$header.outerHeight() + 1,
				terminate:	function() { $header.removeClass('alt'); },
				enter:		function() { $header.addClass('alt'); },
				leave:		function() { $header.removeClass('alt'); }
			});

		}


})(jQuery);

<script>
(function(){
  const layers = Array.from(document.querySelectorAll('.plx-layer'));
  if (!layers.length) return;

  // Compute an offset relative to the layer’s “home” so it parallax-moves nicely
  const getOffset = (el, speed) => {
    const rect = el.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const elTop = rect.top + scrollTop;         // element’s page-top
    const viewportMid = scrollTop + window.innerHeight * 0.5;
    // move faster/slower based on distance from viewport middle
    return (viewportMid - elTop) * speed;
  };

  let ticking = false;
  function update(){
    ticking = false;
    for (const el of layers){
      const speed = parseFloat(el.dataset.speed) || 0.2;
      const y = getOffset(el, speed);
      // If element is horizontally centered, keep translateX(-50%)
      if (el.style.left === '50%' || getComputedStyle(el).left === '50%'){
        el.style.transform = `translate3d(-50%, ${y.toFixed(2)}px, 0)`;
      } else {
        el.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0)`;
      }
    }
  }

  function onScroll(){
    if (!ticking){
      window.requestAnimationFrame(update);
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, {passive:true});
  window.addEventListener('resize', onScroll, {passive:true});
  // initial position
  onScroll();

  // Respect reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    window.removeEventListener('scroll', onScroll);
    layers.forEach(el => el.style.transform = '');
  }
})();
</script>
