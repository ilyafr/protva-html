jQuery(function($){
	
	window.appHasel = window.appHasel || {};
	appHasel.houses = window.document.getElementById('hses');
	
	/**
	* Google Map
	*/
	if(document.getElementById("gmap")) {

		var latLng = {
						'office': [55.087925,36.655127], // 55.588866,37.470271
						'centerpoint': [55.0486832,36.731031],
						'object': [55.0266832,36.731031]
					};
		
		var myLatlng = new google.maps.LatLng(latLng.office[0],latLng.office[1]); // Отдел продаж
		var mycLatlng = new google.maps.LatLng(latLng.centerpoint[0],latLng.centerpoint[1]); // Начальная точка
		var myLatlng_2 = new google.maps.LatLng(latLng.object[0],latLng.object[1]); // Жилой квартал «Протва Центр»

		var stylez = [
			{
				featureType: "all",
				elementType: "all",
				stylers: [
					{
						saturation: 10
					}
				]
			}
		];

		var myOptions = {
			scrollwheel: false,
			zoomControl: true,
			panControl: false,
			mapTypeControl: false,
			mapTypeControlOptions:{
				style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
				position: google.maps.ControlPosition.RIGHT_CENTER
			},
			zoomControlOptions: {
				style: google.maps.ZoomControlStyle.SMALL,
				position: google.maps.ControlPosition.LEFT_CENTER
			},
			zoom: 12,
			center: mycLatlng,
			mapTypeIds: [
							google.maps.MapTypeId.ROADMAP,
							'tehgrayz'
						]
		};

		var map = new google.maps.Map(
										document.getElementById("gmap"),
										myOptions
									);
		var mapType = new google.maps.StyledMapType(
														stylez,
														{
															name: "Grayscale"
														}
													);
		
		map.mapTypes.set('tehgrayz', mapType);
		map.setMapTypeId('tehgrayz');


		var contentString = '<p><strong>Отдел продаж<br />Жилого квартала «Протва Центр»</strong></p><p>Россия, Калужская область,<br />г. Белоусово, Калужское шоссе, д. 12/3</p><p><span>Телефон:</span><br />+7 (48439) 5-06-08,<br />+7 (910) 917-20-50</p>'; 

		var contentString2 = '<p><strong>Жилой квартал «Протва Центр»</strong><br />Россия, Калужская область, г. Жуков</p><p class="gb">Телефон:<br />+7 (48439) 5-06-08,<br />+7 (910) 917-20-50<br />Сайт: <a href="http://protva-centr.ru" target="_blank">protva-centr.ru</a></p>';

		var infowindow = new google.maps.InfoWindow({
			content: contentString
		});
		var infowindow2 = new google.maps.InfoWindow({
			content: contentString2
		});

		var marker = new google.maps.Marker({
			position: myLatlng,
			map: map,
			title: 'Отдел продаж жилого квартала «Протва Центр»',
			icon: '/images/map-icons/office.png'
		});
		
		var marker_2 = new google.maps.Marker({
			position: myLatlng_2,
			map: map,
			title: 'Жилой квартал «Протва Центр»',
			icon: '/images/map-icons/object.png'
		});

		// 'Отдел продаж жилого квартала «Протва Центр»'
		google.maps.event.addListener(marker, 'click', function() {
			var ccc = new google.maps.LatLng(latLng.office[0],latLng.office[1]);
			map.panTo(ccc);
			infowindow.open(map,marker);
			infowindow2.close(map,marker_2);
		});
		
		// 'Жилой квартал «Протва Центр»'
		google.maps.event.addListener(marker_2, 'click', function() {
			var ccc = new google.maps.LatLng(latLng.object[0],latLng.object[1]);
			map.panTo(ccc);
			infowindow2.open(map,marker_2);
			infowindow.close(map,marker);
		});
		
		infowindow2.open(map,marker_2);
		
	}
	
	/**
	* Fotorama
	*/
	(function() {
		
		var $fotorama = $('.fotorama');

		if( $fotorama.size() ) {
			
			// 1. Initialize fotorama manually.
			var $fotoramaDiv = jQuery('.fotorama_custom').fotorama();

			// 2. Get the API object.
			var fotorama = $fotoramaDiv.data('fotorama');

			$('<div class="fotorama_custom__arr fotorama_custom__arr--prev"><i class="icons icons-prev"></i></div>').insertBefore(".fotorama__nav");
			$('<div class="fotorama_custom__arr fotorama_custom__arr--next"><i class="icons icons-next"></i></div>').insertAfter(".fotorama__nav");
			
			$('.fotorama_custom__arr--prev').click(function () {
				fotorama.show('<');
			});
			$('.fotorama_custom__arr--next').click(function () {
				fotorama.show('>');
			});
			
		}
		
	}());
	
	/**
	* Tooltip
	*/
	(function() {
		
		$('[data-toggle="tooltip"]').tooltip();
	
	}());
	
	/**
	* LazyLoad for image
	*/
	(function() {
		
		appHasel.layzr = new Layzr();
		
	}());
	
	/**
	* maphilight
	*/
	jQuery.expr[':'].parents = function(a,i,m){
		return jQuery(a).parents(m[3]).length < 1;
	};

	appHasel = (function(body) {
		var $win = $(window),
			body = body,
			$doc = $(document),
			$scltoHouse =$(),
			$scltoApart = $(),
			dly = 400,
			$htmBdy = $('html, body'),
			$hses = $(),
			$ajax_replaced_top = $(),
			$ajax_replaced_bottom = $(),
			$hse = $(),
			$hse__num = $(),
			$hse__img = $(),
			$hse__map = $(),
			$hse__are = $(),

			$flo = $(),
			$flo__img = $(),
			$flo__map = $(),
			$flo__are = $(),
			$flo_hse__are = $(),
			$flo_drt__num = $(),

			$flo_ifo_she = $(),
			$flo_ifo_pdf = $(),

			$hse_num = $(),
			$hse_num2 = $(),
			$bld_num = $(),
			$apt_cnt = $(),
			$flo_num = $(),
			$apt_num = $(),
			$apt_ttl = $(),

			$flrs_scm = $(),
			$flrs_scm_itm = $(),

			busy = false,
			$this = this;

		function sclToElm(elm) {
			var dly2 = dly * 3;
			if(!busy) {
				$htmBdy.animate({
					scrollTop: $('#' + elm).offset().top
				}, dly2);
			}
		}

		function ajaxLoad(url) {
			setTimeout(function() {
				$ajax_replaced_bottom.load(url + ' #ajax-replaced-bottom');
				$ajax_replaced_top.load(url + ' #ajax-replaced-top', function() {
					$('#hses').removeClass('loader');
					appHasel.layzr = new Layzr();
					parseVariable();

					appHasel.hseHilight();
					appHasel.floHilight();
					$flo_hse__are.filter('.active').trigger('check');
					sclToElm($flo_hse__are.filter('.active').data('sclto'));

					// $flo_drt__num.eq(0).trigger('click');
					// appHasel.init();

				});
			}, 2000);
		}

		function parseVariable() {
			$scltoHouse = $('#sclto-hse');
			$scltoApart = $('#sclto-apt');
			$ajax_replaced_top = $('#ajax-replaced-top');
			$ajax_replaced_bottom = $('#ajax-replaced-bottom');
			$hses = $('#hses');
			$hse = $('.js-houses-scheme');
			$hse__num = $('.js-houses__num');
			$hse__img = $hse.find('.js-houses__img:eq(0)');
			$hse__map = $hse.find('.js-houses__map:eq(0)');
			$hse__are = $hse.find('.js-houses__area');

			$flo = $('.js-floors-scheme');
			$flo__img = $flo.find('.js-floors__img');
			$flo__map = $flo.find('.js-floors__map:eq(0)');
			$flo__are = $flo.find('.js-floors__area');
			//$flo_hse__are = $flo__are.not('.reserv,.sold').add($hse__are);
			$flo_hse__are = $flo__are.add($hse__are);
			$flo_drt__num = $('.js-floors-direct__num');

			$flo_ifo_she = $('.js-floor-info__scheme');
			$flo_ifo_pdf = $('.js-floor-info__pdf');
			
			$hse_num = $('#hse-num');
			$hse_num2 = $('#hse-num2');
			$bld_num = $('#bld-phs');


			$apt_cnt = $('.house-info__apartment-num');


			$flo_num = $('#flo-num');
			$apt_ttl = $('#apt-ttl');
			$apt_num = $('#apt-num');
			$flrs_scm = $('#floors-scheme');
			$flrs_scm_itm = $flrs_scm.find('>.floors-scheme__item');
		}

		return {
			init: function(body) {
				busy = true;
				parseVariable();
				
				appHasel.hseHilight();
				appHasel.floHilight();

				// Выбор дома / квартиры
				//$doc.on('click', '.js-floors__area:not(.reserv,.sold),.js-houses__area,.house-info__apartment-num,.js-floors-direct__num', function(e) {
				
        $doc.on('click', '.js-floors__area,.js-houses__area,.house-info__apartment-num,.js-floors-direct__num', function(e) {
					e.preventDefault();

					var $target = $(e.target),
						dly3 = dly * 3 / 2;
						dly2 = dly / 2,
						data_ajx_hse = $target.data('ajx-hse');

					if($target.is('.js-floors__area')) {
						// Выбор квартиры
						//$flo__are.not('.reserv,.sold').trigger('uncheck');
						$flo__are.trigger('uncheck');

						$hse_num2.text($target.data('hse-num2'));
						$flo_num.text($target.data('flo-num'));
						$apt_ttl.text($target.data('apt-ttl'));
						$apt_num.text($target.data('apt-num'));

						if(!busy) {
							$flo_ifo_she
								.not('.hide')
								.animate({
									'opacity': 0.0
								}, dly, function() {
									$(this).addClass('hide');
								});

							$flo_ifo_she
								.filter('#apt-trg-' + $target.data('apt-trg'))
								.stop()
								.removeClass('hide')
								.css({
									'opacity': 0.0
								})
								.animate({
									'opacity': 1.0
								}, dly, function() {

								});
							$flo_ifo_pdf.attr('href', $flo_ifo_pdf.attr('href').replace(/[0-9]/g, $target.data('apt-trg')) );
						}
						$target.trigger('check');
						sclToElm($(this).data('sclto'));

					} else if($target.is('.js-houses__area')) {
						// Выбор дома
						//$flo__are.not('.reserv,.sold').add($hse__are).trigger('uncheck');
						$flo__are.add($hse__are).trigger('uncheck');
					if(!busy && !$target.hasClass('active')) {
							$hses.addClass('loader');
							ajaxLoad(data_ajx_hse);
						}
					} else if($target.is('.house-info__apartment-num')) {
						// [Подсветка доступных квартир]
						var $this = $(this),
							$sale = $flo__are.filter('.sale');
						$sale
							.data('maphilight',
								{
									"fillColor": "9ad283"
									,alwaysOn: $this.hasClass('active')? false : true
								}
							).trigger('alwaysOn.maphilight');
						$this.toggleClass('active');

					} else if($target.is('.js-floors-direct__num') || $target.parents('a').is('.js-floors-direct__num')) {
						// [Выбор этажа]
						var $this = $(this),
								dly3 = dly * 3 / 2;
								dly2 = dly / 2;
							busy = true;

							if(busy && !$this.hasClass('active')) {
								$flo_drt__num.removeClass('active');
								$this.addClass('active');
								$flo_num.text($this.data('flo-num'));

								$flrs_scm_itm
									.not('.dnone')
									.animate({
										'opacity': 0.0
									}, dly3, function() {
										$(this).addClass('dnone');
									});

								$('#flrs-scm-' + $this.data('flrs-scm'))
									.css({
										'opacity': 0.0
									})
									.removeClass('dnone')
									.animate({
										'opacity': 1.0
									}, dly2, function() {
										$(this).removeClass('dnone');
										busy = false;
									});
							} else {
								return false;
							}

					}
				});

				$flo_hse__are.filter('.active').trigger('click').trigger('check');
				$flo_drt__num.eq(0).trigger('click');

				busy = false;
			},
			hseHilight: function() {

				// [Инициализация подсветки домов]
				$hse__img.maphilight({"stroke": true, "strokeColor": "9cff00", "strokeWidth": 5.0, "fillOpacity": 0.0});

				// [Инициализация подсветки квартир]
				$flo__img.maphilight({"stroke": false,"fillOpacity": 0.6, "fade": true});

			},
			floHilight: function() {

				$flo__are.trigger('alluncheck');

				var $sale = $flo__are.filter('.sale'),
					$sold = $flo__are.filter('.sold'),
					$reserv = $flo__are.filter('.reserv');

				$sale.data('maphilight',
								{
									"fillColor": "9ad283"
								}
							);
				$sold.data('maphilight',
								{
									"fillColor": "fb7e7e"
									,alwaysOn: false
								}
							).trigger('alwaysOn.maphilight');
				$reserv.data('maphilight',
								{
									"fillColor": "ffe47f"
									,alwaysOn: false
								}
							).trigger('alwaysOn.maphilight');
			}
		}
	}(appHasel.houses));


	appHasel.init();

	
	/**
	* Form Validate
	*/
	(function() {
		
		$('form.form-horizontal').validate({
			errorPlacement: function(error, element) {
				return true;
			}
		});
		
	}());
	
	/**
	* Inputmask
	*/
	(function() {
		
		$(":input").inputmask();
	
	}());

});