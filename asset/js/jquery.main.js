jQuery(function () {
  initSlickCarousel();
  initAccordion();
  initAnchors();
  initCustomForms();
  initRetinaCover();
  initInViewport();
});
function initInViewport() {
  jQuery(".viewport-section").itemInViewport({});
}
function initRetinaCover() {
  jQuery(".bg-stretch").retinaCover();
}
function initCustomForms() {
  jcf.replaceAll();
}
function initAccordion() {
  jQuery(".accordion").slideAccordion({
    opener: ".opener",
    slider: ".drop",
    animSpeed: 300,
  });
}
function initAnchors() {
  new SmoothScroll({
    anchorLinks: 'a[href^="#"]:not([href="#"])',
    extraOffset: 0,
    wheelBehavior: "none",
  });
}
function initSlickCarousel() {
  jQuery(".slider").slick({
    slidesToScroll: 1,
    rows: 0,
    infinite: false,
    dots: true,
    prevArrow: '<button class="slick-prev">Previous</button>',
    nextArrow: '<button class="slick-next">Next</button>',
    mobileFirst: true,
    responsive: [
      { breakpoint: 767, settings: { slidesToShow: 2 } },
      { breakpoint: 1023, settings: { slidesToShow: 3 } },
    ],
  });
  var win = jQuery(window);
  jQuery(".posts").each(function () {
    var holder = jQuery(this);
    var holderClasses = holder.attr("class");
    var holderHtml = holder.html();
    var mode = null;
    var refresh = function () {
      switch (mode) {
        case "desktop":
          holder.attr("class", holderClasses).html(holderHtml);
          break;
        case "mobile":
          holder.slick({
            slidesToScroll: 1,
            rows: 0,
            infinite: false,
            dots: true,
            prevArrow: '<button class="slick-prev">Previous</button>',
            nextArrow: '<button class="slick-next">Next</button>',
          });
          break;
      }
    };
    var resizeHandler = function () {
      if (window.innerWidth > 767) {
        if (mode !== "desktop") {
          mode = "desktop";
          refresh();
        }
      } else {
        if (mode !== "mobile") {
          mode = "mobile";
          refresh();
        }
      }
    };
    win.on("resize orientationchange", resizeHandler);
    resizeHandler();
  });
  jQuery(".custom-slide").each(function () {
    var holder = jQuery(this);
    holder.slick({
      slidesToShow: 4,
      speed: 5000,
      autoplay: true,
      slickGoTo: 4,
      infinite: true,
      autoplaySpeed: 0,
      cssEase: "linear",
      arrows: false,
      draggable: false,
      variableWidth: true,
      pauseOnHover: false,
      rows: 0,
      swipeToSlide: true,
      centerMode: true,
      focusOnSelect: true,
      prevArrow: '<button class="slick-prev">Previous</button>',
      nextArrow: '<button class="slick-next">Next</button>',
      slidesToScroll: 1,
    });
  });
}
(function (i) {
  "use strict";
  "function" == typeof define && define.amd
    ? define(["jquery"], i)
    : "undefined" != typeof exports
    ? (module.exports = i(require("jquery")))
    : i(jQuery);
})(function (i) {
  "use strict";
  var e = window.Slick || {};
  (e = (function () {
    function e(e, o) {
      var s,
        n = this;
      (n.defaults = {
        accessibility: !0,
        adaptiveHeight: !1,
        appendArrows: i(e),
        appendDots: i(e),
        arrows: !0,
        asNavFor: null,
        prevArrow:
          '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
        nextArrow:
          '<button class="slick-next" aria-label="Next" type="button">Next</button>',
        autoplay: !1,
        autoplaySpeed: 3e3,
        centerMode: !1,
        centerPadding: "50px",
        cssEase: "ease",
        customPaging: function (e, t) {
          return i('<button type="button" />').text(t + 1);
        },
        dots: !1,
        dotsClass: "slick-dots",
        draggable: !0,
        easing: "linear",
        edgeFriction: 0.35,
        fade: !1,
        focusOnSelect: !1,
        focusOnChange: !1,
        infinite: !0,
        initialSlide: 0,
        lazyLoad: "ondemand",
        mobileFirst: !1,
        pauseOnHover: !0,
        pauseOnFocus: !0,
        pauseOnDotsHover: !1,
        respondTo: "window",
        responsive: null,
        rows: 1,
        rtl: !1,
        slide: "",
        slidesPerRow: 1,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 500,
        swipe: !0,
        swipeToSlide: !1,
        touchMove: !0,
        touchThreshold: 5,
        useCSS: !0,
        useTransform: !0,
        variableWidth: !1,
        vertical: !1,
        verticalSwiping: !1,
        waitForAnimate: !0,
        zIndex: 1e3,
      }),
        (n.initials = {
          animating: !1,
          dragging: !1,
          autoPlayTimer: null,
          currentDirection: 0,
          currentLeft: null,
          currentSlide: 0,
          direction: 1,
          $dots: null,
          listWidth: null,
          listHeight: null,
          loadIndex: 0,
          $nextArrow: null,
          $prevArrow: null,
          scrolling: !1,
          slideCount: null,
          slideWidth: null,
          $slideTrack: null,
          $slides: null,
          sliding: !1,
          slideOffset: 0,
          swipeLeft: null,
          swiping: !1,
          $list: null,
          touchObject: {},
          transformsEnabled: !1,
          unslicked: !1,
        }),
        i.extend(n, n.initials),
        (n.activeBreakpoint = null),
        (n.animType = null),
        (n.animProp = null),
        (n.breakpoints = []),
        (n.breakpointSettings = []),
        (n.cssTransitions = !1),
        (n.focussed = !1),
        (n.interrupted = !1),
        (n.hidden = "hidden"),
        (n.paused = !0),
        (n.positionProp = null),
        (n.respondTo = null),
        (n.rowCount = 1),
        (n.shouldClick = !0),
        (n.$slider = i(e)),
        (n.$slidesCache = null),
        (n.transformType = null),
        (n.transitionType = null),
        (n.visibilityChange = "visibilitychange"),
        (n.windowWidth = 0),
        (n.windowTimer = null),
        (s = i(e).data("slick") || {}),
        (n.options = i.extend({}, n.defaults, o, s)),
        (n.currentSlide = n.options.initialSlide),
        (n.originalSettings = n.options),
        "undefined" != typeof document.mozHidden
          ? ((n.hidden = "mozHidden"),
            (n.visibilityChange = "mozvisibilitychange"))
          : "undefined" != typeof document.webkitHidden &&
            ((n.hidden = "webkitHidden"),
            (n.visibilityChange = "webkitvisibilitychange")),
        (n.autoPlay = i.proxy(n.autoPlay, n)),
        (n.autoPlayClear = i.proxy(n.autoPlayClear, n)),
        (n.autoPlayIterator = i.proxy(n.autoPlayIterator, n)),
        (n.changeSlide = i.proxy(n.changeSlide, n)),
        (n.clickHandler = i.proxy(n.clickHandler, n)),
        (n.selectHandler = i.proxy(n.selectHandler, n)),
        (n.setPosition = i.proxy(n.setPosition, n)),
        (n.swipeHandler = i.proxy(n.swipeHandler, n)),
        (n.dragHandler = i.proxy(n.dragHandler, n)),
        (n.keyHandler = i.proxy(n.keyHandler, n)),
        (n.instanceUid = t++),
        (n.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/),
        n.registerBreakpoints(),
        n.init(!0);
    }
    var t = 0;
    return e;
  })()),
    (e.prototype.activateADA = function () {
      var i = this;
      i.$slideTrack
        .find(".slick-active")
        .attr({ "aria-hidden": "false" })
        .find("a, input, button, select")
        .attr({ tabindex: "0" });
    }),
    (e.prototype.addSlide = e.prototype.slickAdd =
      function (e, t, o) {
        var s = this;
        if ("boolean" == typeof t) (o = t), (t = null);
        else if (t < 0 || t >= s.slideCount) return !1;
        s.unload(),
          "number" == typeof t
            ? 0 === t && 0 === s.$slides.length
              ? i(e).appendTo(s.$slideTrack)
              : o
              ? i(e).insertBefore(s.$slides.eq(t))
              : i(e).insertAfter(s.$slides.eq(t))
            : o === !0
            ? i(e).prependTo(s.$slideTrack)
            : i(e).appendTo(s.$slideTrack),
          (s.$slides = s.$slideTrack.children(this.options.slide)),
          s.$slideTrack.children(this.options.slide).detach(),
          s.$slideTrack.append(s.$slides),
          s.$slides.each(function (e, t) {
            i(t).attr("data-slick-index", e);
          }),
          (s.$slidesCache = s.$slides),
          s.reinit();
      }),
    (e.prototype.animateHeight = function () {
      var i = this;
      if (
        1 === i.options.slidesToShow &&
        i.options.adaptiveHeight === !0 &&
        i.options.vertical === !1
      ) {
        var e = i.$slides.eq(i.currentSlide).outerHeight(!0);
        i.$list.animate({ height: e }, i.options.speed);
      }
    }),
    (e.prototype.animateSlide = function (e, t) {
      var o = {},
        s = this;
      s.animateHeight(),
        s.options.rtl === !0 && s.options.vertical === !1 && (e = -e),
        s.transformsEnabled === !1
          ? s.options.vertical === !1
            ? s.$slideTrack.animate(
                { left: e },
                s.options.speed,
                s.options.easing,
                t
              )
            : s.$slideTrack.animate(
                { top: e },
                s.options.speed,
                s.options.easing,
                t
              )
          : s.cssTransitions === !1
          ? (s.options.rtl === !0 && (s.currentLeft = -s.currentLeft),
            i({ animStart: s.currentLeft }).animate(
              { animStart: e },
              {
                duration: s.options.speed,
                easing: s.options.easing,
                step: function (i) {
                  (i = Math.ceil(i)),
                    s.options.vertical === !1
                      ? ((o[s.animType] = "translate(" + i + "px, 0px)"),
                        s.$slideTrack.css(o))
                      : ((o[s.animType] = "translate(0px," + i + "px)"),
                        s.$slideTrack.css(o));
                },
                complete: function () {
                  t && t.call();
                },
              }
            ))
          : (s.applyTransition(),
            (e = Math.ceil(e)),
            s.options.vertical === !1
              ? (o[s.animType] = "translate3d(" + e + "px, 0px, 0px)")
              : (o[s.animType] = "translate3d(0px," + e + "px, 0px)"),
            s.$slideTrack.css(o),
            t &&
              setTimeout(function () {
                s.disableTransition(), t.call();
              }, s.options.speed));
    }),
    (e.prototype.getNavTarget = function () {
      var e = this,
        t = e.options.asNavFor;
      return t && null !== t && (t = i(t).not(e.$slider)), t;
    }),
    (e.prototype.asNavFor = function (e) {
      var t = this,
        o = t.getNavTarget();
      null !== o &&
        "object" == typeof o &&
        o.each(function () {
          var t = i(this).slick("getSlick");
          t.unslicked || t.slideHandler(e, !0);
        });
    }),
    (e.prototype.applyTransition = function (i) {
      var e = this,
        t = {};
      e.options.fade === !1
        ? (t[e.transitionType] =
            e.transformType + " " + e.options.speed + "ms " + e.options.cssEase)
        : (t[e.transitionType] =
            "opacity " + e.options.speed + "ms " + e.options.cssEase),
        e.options.fade === !1 ? e.$slideTrack.css(t) : e.$slides.eq(i).css(t);
    }),
    (e.prototype.autoPlay = function () {
      var i = this;
      i.autoPlayClear(),
        i.slideCount > i.options.slidesToShow &&
          (i.autoPlayTimer = setInterval(
            i.autoPlayIterator,
            i.options.autoplaySpeed
          ));
    }),
    (e.prototype.autoPlayClear = function () {
      var i = this;
      i.autoPlayTimer && clearInterval(i.autoPlayTimer);
    }),
    (e.prototype.autoPlayIterator = function () {
      var i = this,
        e = i.currentSlide + i.options.slidesToScroll;
      i.paused ||
        i.interrupted ||
        i.focussed ||
        (i.options.infinite === !1 &&
          (1 === i.direction && i.currentSlide + 1 === i.slideCount - 1
            ? (i.direction = 0)
            : 0 === i.direction &&
              ((e = i.currentSlide - i.options.slidesToScroll),
              i.currentSlide - 1 === 0 && (i.direction = 1))),
        i.slideHandler(e));
    }),
    (e.prototype.buildArrows = function () {
      var e = this;
      e.options.arrows === !0 &&
        ((e.$prevArrow = i(e.options.prevArrow).addClass("slick-arrow")),
        (e.$nextArrow = i(e.options.nextArrow).addClass("slick-arrow")),
        e.slideCount > e.options.slidesToShow
          ? (e.$prevArrow
              .removeClass("slick-hidden")
              .removeAttr("aria-hidden tabindex"),
            e.$nextArrow
              .removeClass("slick-hidden")
              .removeAttr("aria-hidden tabindex"),
            e.htmlExpr.test(e.options.prevArrow) &&
              e.$prevArrow.prependTo(e.options.appendArrows),
            e.htmlExpr.test(e.options.nextArrow) &&
              e.$nextArrow.appendTo(e.options.appendArrows),
            e.options.infinite !== !0 &&
              e.$prevArrow
                .addClass("slick-disabled")
                .attr("aria-disabled", "true"))
          : e.$prevArrow
              .add(e.$nextArrow)
              .addClass("slick-hidden")
              .attr({ "aria-disabled": "true", tabindex: "-1" }));
    }),
    (e.prototype.buildDots = function () {
      var e,
        t,
        o = this;
      if (o.options.dots === !0 && o.slideCount > o.options.slidesToShow) {
        for (
          o.$slider.addClass("slick-dotted"),
            t = i("<ul />").addClass(o.options.dotsClass),
            e = 0;
          e <= o.getDotCount();
          e += 1
        )
          t.append(i("<li />").append(o.options.customPaging.call(this, o, e)));
        (o.$dots = t.appendTo(o.options.appendDots)),
          o.$dots.find("li").first().addClass("slick-active");
      }
    }),
    (e.prototype.buildOut = function () {
      var e = this;
      (e.$slides = e.$slider
        .children(e.options.slide + ":not(.slick-cloned)")
        .addClass("slick-slide")),
        (e.slideCount = e.$slides.length),
        e.$slides.each(function (e, t) {
          i(t)
            .attr("data-slick-index", e)
            .data("originalStyling", i(t).attr("style") || "");
        }),
        e.$slider.addClass("slick-slider"),
        (e.$slideTrack =
          0 === e.slideCount
            ? i('<div class="slick-track"/>').appendTo(e.$slider)
            : e.$slides.wrapAll('<div class="slick-track"/>').parent()),
        (e.$list = e.$slideTrack.wrap('<div class="slick-list"/>').parent()),
        e.$slideTrack.css("opacity", 0),
        (e.options.centerMode !== !0 && e.options.swipeToSlide !== !0) ||
          (e.options.slidesToScroll = 1),
        i("img[data-lazy]", e.$slider).not("[src]").addClass("slick-loading"),
        e.setupInfinite(),
        e.buildArrows(),
        e.buildDots(),
        e.updateDots(),
        e.setSlideClasses(
          "number" == typeof e.currentSlide ? e.currentSlide : 0
        ),
        e.options.draggable === !0 && e.$list.addClass("draggable");
    }),
    (e.prototype.buildRows = function () {
      var i,
        e,
        t,
        o,
        s,
        n,
        r,
        l = this;
      if (
        ((o = document.createDocumentFragment()),
        (n = l.$slider.children()),
        l.options.rows > 0)
      ) {
        for (
          r = l.options.slidesPerRow * l.options.rows,
            s = Math.ceil(n.length / r),
            i = 0;
          i < s;
          i++
        ) {
          var d = document.createElement("div");
          for (e = 0; e < l.options.rows; e++) {
            var a = document.createElement("div");
            for (t = 0; t < l.options.slidesPerRow; t++) {
              var c = i * r + (e * l.options.slidesPerRow + t);
              n.get(c) && a.appendChild(n.get(c));
            }
            d.appendChild(a);
          }
          o.appendChild(d);
        }
        l.$slider.empty().append(o),
          l.$slider
            .children()
            .children()
            .children()
            .css({
              width: 100 / l.options.slidesPerRow + "%",
              display: "inline-block",
            });
      }
    }),
    (e.prototype.checkResponsive = function (e, t) {
      var o,
        s,
        n,
        r = this,
        l = !1,
        d = r.$slider.width(),
        a = window.innerWidth || i(window).width();
      if (
        ("window" === r.respondTo
          ? (n = a)
          : "slider" === r.respondTo
          ? (n = d)
          : "min" === r.respondTo && (n = Math.min(a, d)),
        r.options.responsive &&
          r.options.responsive.length &&
          null !== r.options.responsive)
      ) {
        s = null;
        for (o in r.breakpoints)
          r.breakpoints.hasOwnProperty(o) &&
            (r.originalSettings.mobileFirst === !1
              ? n < r.breakpoints[o] && (s = r.breakpoints[o])
              : n > r.breakpoints[o] && (s = r.breakpoints[o]));
        null !== s
          ? null !== r.activeBreakpoint
            ? (s !== r.activeBreakpoint || t) &&
              ((r.activeBreakpoint = s),
              "unslick" === r.breakpointSettings[s]
                ? r.unslick(s)
                : ((r.options = i.extend(
                    {},
                    r.originalSettings,
                    r.breakpointSettings[s]
                  )),
                  e === !0 && (r.currentSlide = r.options.initialSlide),
                  r.refresh(e)),
              (l = s))
            : ((r.activeBreakpoint = s),
              "unslick" === r.breakpointSettings[s]
                ? r.unslick(s)
                : ((r.options = i.extend(
                    {},
                    r.originalSettings,
                    r.breakpointSettings[s]
                  )),
                  e === !0 && (r.currentSlide = r.options.initialSlide),
                  r.refresh(e)),
              (l = s))
          : null !== r.activeBreakpoint &&
            ((r.activeBreakpoint = null),
            (r.options = r.originalSettings),
            e === !0 && (r.currentSlide = r.options.initialSlide),
            r.refresh(e),
            (l = s)),
          e || l === !1 || r.$slider.trigger("breakpoint", [r, l]);
      }
    }),
    (e.prototype.changeSlide = function (e, t) {
      var o,
        s,
        n,
        r = this,
        l = i(e.currentTarget);
      switch (
        (l.is("a") && e.preventDefault(),
        l.is("li") || (l = l.closest("li")),
        (n = r.slideCount % r.options.slidesToScroll !== 0),
        (o = n
          ? 0
          : (r.slideCount - r.currentSlide) % r.options.slidesToScroll),
        e.data.message)
      ) {
        case "previous":
          (s = 0 === o ? r.options.slidesToScroll : r.options.slidesToShow - o),
            r.slideCount > r.options.slidesToShow &&
              r.slideHandler(r.currentSlide - s, !1, t);
          break;
        case "next":
          (s = 0 === o ? r.options.slidesToScroll : o),
            r.slideCount > r.options.slidesToShow &&
              r.slideHandler(r.currentSlide + s, !1, t);
          break;
        case "index":
          var d =
            0 === e.data.index
              ? 0
              : e.data.index || l.index() * r.options.slidesToScroll;
          r.slideHandler(r.checkNavigable(d), !1, t),
            l.children().trigger("focus");
          break;
        default:
          return;
      }
    }),
    (e.prototype.checkNavigable = function (i) {
      var e,
        t,
        o = this;
      if (((e = o.getNavigableIndexes()), (t = 0), i > e[e.length - 1]))
        i = e[e.length - 1];
      else
        for (var s in e) {
          if (i < e[s]) {
            i = t;
            break;
          }
          t = e[s];
        }
      return i;
    }),
    (e.prototype.cleanUpEvents = function () {
      var e = this;
      e.options.dots &&
        null !== e.$dots &&
        (i("li", e.$dots)
          .off("click.slick", e.changeSlide)
          .off("mouseenter.slick", i.proxy(e.interrupt, e, !0))
          .off("mouseleave.slick", i.proxy(e.interrupt, e, !1)),
        e.options.accessibility === !0 &&
          e.$dots.off("keydown.slick", e.keyHandler)),
        e.$slider.off("focus.slick blur.slick"),
        e.options.arrows === !0 &&
          e.slideCount > e.options.slidesToShow &&
          (e.$prevArrow && e.$prevArrow.off("click.slick", e.changeSlide),
          e.$nextArrow && e.$nextArrow.off("click.slick", e.changeSlide),
          e.options.accessibility === !0 &&
            (e.$prevArrow && e.$prevArrow.off("keydown.slick", e.keyHandler),
            e.$nextArrow && e.$nextArrow.off("keydown.slick", e.keyHandler))),
        e.$list.off("touchstart.slick mousedown.slick", e.swipeHandler),
        e.$list.off("touchmove.slick mousemove.slick", e.swipeHandler),
        e.$list.off("touchend.slick mouseup.slick", e.swipeHandler),
        e.$list.off("touchcancel.slick mouseleave.slick", e.swipeHandler),
        e.$list.off("click.slick", e.clickHandler),
        i(document).off(e.visibilityChange, e.visibility),
        e.cleanUpSlideEvents(),
        e.options.accessibility === !0 &&
          e.$list.off("keydown.slick", e.keyHandler),
        e.options.focusOnSelect === !0 &&
          i(e.$slideTrack).children().off("click.slick", e.selectHandler),
        i(window).off(
          "orientationchange.slick.slick-" + e.instanceUid,
          e.orientationChange
        ),
        i(window).off("resize.slick.slick-" + e.instanceUid, e.resize),
        i("[draggable!=true]", e.$slideTrack).off(
          "dragstart",
          e.preventDefault
        ),
        i(window).off("load.slick.slick-" + e.instanceUid, e.setPosition);
    }),
    (e.prototype.cleanUpSlideEvents = function () {
      var e = this;
      e.$list.off("mouseenter.slick", i.proxy(e.interrupt, e, !0)),
        e.$list.off("mouseleave.slick", i.proxy(e.interrupt, e, !1));
    }),
    (e.prototype.cleanUpRows = function () {
      var i,
        e = this;
      e.options.rows > 0 &&
        ((i = e.$slides.children().children()),
        i.removeAttr("style"),
        e.$slider.empty().append(i));
    }),
    (e.prototype.clickHandler = function (i) {
      var e = this;
      e.shouldClick === !1 &&
        (i.stopImmediatePropagation(), i.stopPropagation(), i.preventDefault());
    }),
    (e.prototype.destroy = function (e) {
      var t = this;
      t.autoPlayClear(),
        (t.touchObject = {}),
        t.cleanUpEvents(),
        i(".slick-cloned", t.$slider).detach(),
        t.$dots && t.$dots.remove(),
        t.$prevArrow &&
          t.$prevArrow.length &&
          (t.$prevArrow
            .removeClass("slick-disabled slick-arrow slick-hidden")
            .removeAttr("aria-hidden aria-disabled tabindex")
            .css("display", ""),
          t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.remove()),
        t.$nextArrow &&
          t.$nextArrow.length &&
          (t.$nextArrow
            .removeClass("slick-disabled slick-arrow slick-hidden")
            .removeAttr("aria-hidden aria-disabled tabindex")
            .css("display", ""),
          t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.remove()),
        t.$slides &&
          (t.$slides
            .removeClass(
              "slick-slide slick-active slick-center slick-visible slick-current"
            )
            .removeAttr("aria-hidden")
            .removeAttr("data-slick-index")
            .each(function () {
              i(this).attr("style", i(this).data("originalStyling"));
            }),
          t.$slideTrack.children(this.options.slide).detach(),
          t.$slideTrack.detach(),
          t.$list.detach(),
          t.$slider.append(t.$slides)),
        t.cleanUpRows(),
        t.$slider.removeClass("slick-slider"),
        t.$slider.removeClass("slick-initialized"),
        t.$slider.removeClass("slick-dotted"),
        (t.unslicked = !0),
        e || t.$slider.trigger("destroy", [t]);
    }),
    (e.prototype.disableTransition = function (i) {
      var e = this,
        t = {};
      (t[e.transitionType] = ""),
        e.options.fade === !1 ? e.$slideTrack.css(t) : e.$slides.eq(i).css(t);
    }),
    (e.prototype.fadeSlide = function (i, e) {
      var t = this;
      t.cssTransitions === !1
        ? (t.$slides.eq(i).css({ zIndex: t.options.zIndex }),
          t.$slides
            .eq(i)
            .animate({ opacity: 1 }, t.options.speed, t.options.easing, e))
        : (t.applyTransition(i),
          t.$slides.eq(i).css({ opacity: 1, zIndex: t.options.zIndex }),
          e &&
            setTimeout(function () {
              t.disableTransition(i), e.call();
            }, t.options.speed));
    }),
    (e.prototype.fadeSlideOut = function (i) {
      var e = this;
      e.cssTransitions === !1
        ? e.$slides
            .eq(i)
            .animate(
              { opacity: 0, zIndex: e.options.zIndex - 2 },
              e.options.speed,
              e.options.easing
            )
        : (e.applyTransition(i),
          e.$slides.eq(i).css({ opacity: 0, zIndex: e.options.zIndex - 2 }));
    }),
    (e.prototype.filterSlides = e.prototype.slickFilter =
      function (i) {
        var e = this;
        null !== i &&
          ((e.$slidesCache = e.$slides),
          e.unload(),
          e.$slideTrack.children(this.options.slide).detach(),
          e.$slidesCache.filter(i).appendTo(e.$slideTrack),
          e.reinit());
      }),
    (e.prototype.focusHandler = function () {
      var e = this;
      e.$slider
        .off("focus.slick blur.slick")
        .on("focus.slick", "*", function (t) {
          var o = i(this);
          setTimeout(function () {
            e.options.pauseOnFocus &&
              o.is(":focus") &&
              ((e.focussed = !0), e.autoPlay());
          }, 0);
        })
        .on("blur.slick", "*", function (t) {
          i(this);
          e.options.pauseOnFocus && ((e.focussed = !1), e.autoPlay());
        });
    }),
    (e.prototype.getCurrent = e.prototype.slickCurrentSlide =
      function () {
        var i = this;
        return i.currentSlide;
      }),
    (e.prototype.getDotCount = function () {
      var i = this,
        e = 0,
        t = 0,
        o = 0;
      if (i.options.infinite === !0)
        if (i.slideCount <= i.options.slidesToShow) ++o;
        else
          for (; e < i.slideCount; )
            ++o,
              (e = t + i.options.slidesToScroll),
              (t +=
                i.options.slidesToScroll <= i.options.slidesToShow
                  ? i.options.slidesToScroll
                  : i.options.slidesToShow);
      else if (i.options.centerMode === !0) o = i.slideCount;
      else if (i.options.asNavFor)
        for (; e < i.slideCount; )
          ++o,
            (e = t + i.options.slidesToScroll),
            (t +=
              i.options.slidesToScroll <= i.options.slidesToShow
                ? i.options.slidesToScroll
                : i.options.slidesToShow);
      else
        o =
          1 +
          Math.ceil(
            (i.slideCount - i.options.slidesToShow) / i.options.slidesToScroll
          );
      return o - 1;
    }),
    (e.prototype.getLeft = function (i) {
      var e,
        t,
        o,
        s,
        n = this,
        r = 0;
      return (
        (n.slideOffset = 0),
        (t = n.$slides.first().outerHeight(!0)),
        n.options.infinite === !0
          ? (n.slideCount > n.options.slidesToShow &&
              ((n.slideOffset = n.slideWidth * n.options.slidesToShow * -1),
              (s = -1),
              n.options.vertical === !0 &&
                n.options.centerMode === !0 &&
                (2 === n.options.slidesToShow
                  ? (s = -1.5)
                  : 1 === n.options.slidesToShow && (s = -2)),
              (r = t * n.options.slidesToShow * s)),
            n.slideCount % n.options.slidesToScroll !== 0 &&
              i + n.options.slidesToScroll > n.slideCount &&
              n.slideCount > n.options.slidesToShow &&
              (i > n.slideCount
                ? ((n.slideOffset =
                    (n.options.slidesToShow - (i - n.slideCount)) *
                    n.slideWidth *
                    -1),
                  (r = (n.options.slidesToShow - (i - n.slideCount)) * t * -1))
                : ((n.slideOffset =
                    (n.slideCount % n.options.slidesToScroll) *
                    n.slideWidth *
                    -1),
                  (r = (n.slideCount % n.options.slidesToScroll) * t * -1))))
          : i + n.options.slidesToShow > n.slideCount &&
            ((n.slideOffset =
              (i + n.options.slidesToShow - n.slideCount) * n.slideWidth),
            (r = (i + n.options.slidesToShow - n.slideCount) * t)),
        n.slideCount <= n.options.slidesToShow &&
          ((n.slideOffset = 0), (r = 0)),
        n.options.centerMode === !0 && n.slideCount <= n.options.slidesToShow
          ? (n.slideOffset =
              (n.slideWidth * Math.floor(n.options.slidesToShow)) / 2 -
              (n.slideWidth * n.slideCount) / 2)
          : n.options.centerMode === !0 && n.options.infinite === !0
          ? (n.slideOffset +=
              n.slideWidth * Math.floor(n.options.slidesToShow / 2) -
              n.slideWidth)
          : n.options.centerMode === !0 &&
            ((n.slideOffset = 0),
            (n.slideOffset +=
              n.slideWidth * Math.floor(n.options.slidesToShow / 2))),
        (e =
          n.options.vertical === !1
            ? i * n.slideWidth * -1 + n.slideOffset
            : i * t * -1 + r),
        n.options.variableWidth === !0 &&
          ((o =
            n.slideCount <= n.options.slidesToShow || n.options.infinite === !1
              ? n.$slideTrack.children(".slick-slide").eq(i)
              : n.$slideTrack
                  .children(".slick-slide")
                  .eq(i + n.options.slidesToShow)),
          (e =
            n.options.rtl === !0
              ? o[0]
                ? (n.$slideTrack.width() - o[0].offsetLeft - o.width()) * -1
                : 0
              : o[0]
              ? o[0].offsetLeft * -1
              : 0),
          n.options.centerMode === !0 &&
            ((o =
              n.slideCount <= n.options.slidesToShow ||
              n.options.infinite === !1
                ? n.$slideTrack.children(".slick-slide").eq(i)
                : n.$slideTrack
                    .children(".slick-slide")
                    .eq(i + n.options.slidesToShow + 1)),
            (e =
              n.options.rtl === !0
                ? o[0]
                  ? (n.$slideTrack.width() - o[0].offsetLeft - o.width()) * -1
                  : 0
                : o[0]
                ? o[0].offsetLeft * -1
                : 0),
            (e += (n.$list.width() - o.outerWidth()) / 2))),
        e
      );
    }),
    (e.prototype.getOption = e.prototype.slickGetOption =
      function (i) {
        var e = this;
        return e.options[i];
      }),
    (e.prototype.getNavigableIndexes = function () {
      var i,
        e = this,
        t = 0,
        o = 0,
        s = [];
      for (
        e.options.infinite === !1
          ? (i = e.slideCount)
          : ((t = e.options.slidesToScroll * -1),
            (o = e.options.slidesToScroll * -1),
            (i = 2 * e.slideCount));
        t < i;

      )
        s.push(t),
          (t = o + e.options.slidesToScroll),
          (o +=
            e.options.slidesToScroll <= e.options.slidesToShow
              ? e.options.slidesToScroll
              : e.options.slidesToShow);
      return s;
    }),
    (e.prototype.getSlick = function () {
      return this;
    }),
    (e.prototype.getSlideCount = function () {
      var e,
        t,
        o,
        s,
        n = this;
      return (
        (s = n.options.centerMode === !0 ? Math.floor(n.$list.width() / 2) : 0),
        (o = n.swipeLeft * -1 + s),
        n.options.swipeToSlide === !0
          ? (n.$slideTrack.find(".slick-slide").each(function (e, s) {
              var r, l, d;
              if (
                ((r = i(s).outerWidth()),
                (l = s.offsetLeft),
                n.options.centerMode !== !0 && (l += r / 2),
                (d = l + r),
                o < d)
              )
                return (t = s), !1;
            }),
            (e = Math.abs(i(t).attr("data-slick-index") - n.currentSlide) || 1))
          : n.options.slidesToScroll
      );
    }),
    (e.prototype.goTo = e.prototype.slickGoTo =
      function (i, e) {
        var t = this;
        t.changeSlide({ data: { message: "index", index: parseInt(i) } }, e);
      }),
    (e.prototype.init = function (e) {
      var t = this;
      i(t.$slider).hasClass("slick-initialized") ||
        (i(t.$slider).addClass("slick-initialized"),
        t.buildRows(),
        t.buildOut(),
        t.setProps(),
        t.startLoad(),
        t.loadSlider(),
        t.initializeEvents(),
        t.updateArrows(),
        t.updateDots(),
        t.checkResponsive(!0),
        t.focusHandler()),
        e && t.$slider.trigger("init", [t]),
        t.options.accessibility === !0 && t.initADA(),
        t.options.autoplay && ((t.paused = !1), t.autoPlay());
    }),
    (e.prototype.initADA = function () {
      var e = this,
        t = Math.ceil(e.slideCount / e.options.slidesToShow),
        o = e.getNavigableIndexes().filter(function (i) {
          return i >= 0 && i < e.slideCount;
        });
      e.$slides
        .add(e.$slideTrack.find(".slick-cloned"))
        .attr({ "aria-hidden": "true", tabindex: "-1" })
        .find("a, input, button, select")
        .attr({ tabindex: "-1" }),
        null !== e.$dots &&
          (e.$slides
            .not(e.$slideTrack.find(".slick-cloned"))
            .each(function (t) {
              var s = o.indexOf(t);
              if (
                (i(this).attr({
                  role: "tabpanel",
                  id: "slick-slide" + e.instanceUid + t,
                  tabindex: -1,
                }),
                s !== -1)
              ) {
                var n = "slick-slide-control" + e.instanceUid + s;
                i("#" + n).length && i(this).attr({ "aria-describedby": n });
              }
            }),
          e.$dots
            .attr("role", "tablist")
            .find("li")
            .each(function (s) {
              var n = o[s];
              i(this).attr({ role: "presentation" }),
                i(this)
                  .find("button")
                  .first()
                  .attr({
                    role: "tab",
                    id: "slick-slide-control" + e.instanceUid + s,
                    "aria-controls": "slick-slide" + e.instanceUid + n,
                    "aria-label": s + 1 + " of " + t,
                    "aria-selected": null,
                    tabindex: "-1",
                  });
            })
            .eq(e.currentSlide)
            .find("button")
            .attr({ "aria-selected": "true", tabindex: "0" })
            .end());
      for (var s = e.currentSlide, n = s + e.options.slidesToShow; s < n; s++)
        e.options.focusOnChange
          ? e.$slides.eq(s).attr({ tabindex: "0" })
          : e.$slides.eq(s).removeAttr("tabindex");
      e.activateADA();
    }),
    (e.prototype.initArrowEvents = function () {
      var i = this;
      i.options.arrows === !0 &&
        i.slideCount > i.options.slidesToShow &&
        (i.$prevArrow
          .off("click.slick")
          .on("click.slick", { message: "previous" }, i.changeSlide),
        i.$nextArrow
          .off("click.slick")
          .on("click.slick", { message: "next" }, i.changeSlide),
        i.options.accessibility === !0 &&
          (i.$prevArrow.on("keydown.slick", i.keyHandler),
          i.$nextArrow.on("keydown.slick", i.keyHandler)));
    }),
    (e.prototype.initDotEvents = function () {
      var e = this;
      e.options.dots === !0 &&
        e.slideCount > e.options.slidesToShow &&
        (i("li", e.$dots).on(
          "click.slick",
          { message: "index" },
          e.changeSlide
        ),
        e.options.accessibility === !0 &&
          e.$dots.on("keydown.slick", e.keyHandler)),
        e.options.dots === !0 &&
          e.options.pauseOnDotsHover === !0 &&
          e.slideCount > e.options.slidesToShow &&
          i("li", e.$dots)
            .on("mouseenter.slick", i.proxy(e.interrupt, e, !0))
            .on("mouseleave.slick", i.proxy(e.interrupt, e, !1));
    }),
    (e.prototype.initSlideEvents = function () {
      var e = this;
      e.options.pauseOnHover &&
        (e.$list.on("mouseenter.slick", i.proxy(e.interrupt, e, !0)),
        e.$list.on("mouseleave.slick", i.proxy(e.interrupt, e, !1)));
    }),
    (e.prototype.initializeEvents = function () {
      var e = this;
      e.initArrowEvents(),
        e.initDotEvents(),
        e.initSlideEvents(),
        e.$list.on(
          "touchstart.slick mousedown.slick",
          { action: "start" },
          e.swipeHandler
        ),
        e.$list.on(
          "touchmove.slick mousemove.slick",
          { action: "move" },
          e.swipeHandler
        ),
        e.$list.on(
          "touchend.slick mouseup.slick",
          { action: "end" },
          e.swipeHandler
        ),
        e.$list.on(
          "touchcancel.slick mouseleave.slick",
          { action: "end" },
          e.swipeHandler
        ),
        e.$list.on("click.slick", e.clickHandler),
        i(document).on(e.visibilityChange, i.proxy(e.visibility, e)),
        e.options.accessibility === !0 &&
          e.$list.on("keydown.slick", e.keyHandler),
        e.options.focusOnSelect === !0 &&
          i(e.$slideTrack).children().on("click.slick", e.selectHandler),
        i(window).on(
          "orientationchange.slick.slick-" + e.instanceUid,
          i.proxy(e.orientationChange, e)
        ),
        i(window).on(
          "resize.slick.slick-" + e.instanceUid,
          i.proxy(e.resize, e)
        ),
        i("[draggable!=true]", e.$slideTrack).on("dragstart", e.preventDefault),
        i(window).on("load.slick.slick-" + e.instanceUid, e.setPosition),
        i(e.setPosition);
    }),
    (e.prototype.initUI = function () {
      var i = this;
      i.options.arrows === !0 &&
        i.slideCount > i.options.slidesToShow &&
        (i.$prevArrow.show(), i.$nextArrow.show()),
        i.options.dots === !0 &&
          i.slideCount > i.options.slidesToShow &&
          i.$dots.show();
    }),
    (e.prototype.keyHandler = function (i) {
      var e = this;
      i.target.tagName.match("TEXTAREA|INPUT|SELECT") ||
        (37 === i.keyCode && e.options.accessibility === !0
          ? e.changeSlide({
              data: { message: e.options.rtl === !0 ? "next" : "previous" },
            })
          : 39 === i.keyCode &&
            e.options.accessibility === !0 &&
            e.changeSlide({
              data: { message: e.options.rtl === !0 ? "previous" : "next" },
            }));
    }),
    (e.prototype.lazyLoad = function () {
      function e(e) {
        i("img[data-lazy]", e).each(function () {
          var e = i(this),
            t = i(this).attr("data-lazy"),
            o = i(this).attr("data-srcset"),
            s = i(this).attr("data-sizes") || r.$slider.attr("data-sizes"),
            n = document.createElement("img");
          (n.onload = function () {
            e.animate({ opacity: 0 }, 100, function () {
              o && (e.attr("srcset", o), s && e.attr("sizes", s)),
                e.attr("src", t).animate({ opacity: 1 }, 200, function () {
                  e.removeAttr("data-lazy data-srcset data-sizes").removeClass(
                    "slick-loading"
                  );
                }),
                r.$slider.trigger("lazyLoaded", [r, e, t]);
            });
          }),
            (n.onerror = function () {
              e
                .removeAttr("data-lazy")
                .removeClass("slick-loading")
                .addClass("slick-lazyload-error"),
                r.$slider.trigger("lazyLoadError", [r, e, t]);
            }),
            (n.src = t);
        });
      }
      var t,
        o,
        s,
        n,
        r = this;
      if (
        (r.options.centerMode === !0
          ? r.options.infinite === !0
            ? ((s = r.currentSlide + (r.options.slidesToShow / 2 + 1)),
              (n = s + r.options.slidesToShow + 2))
            : ((s = Math.max(
                0,
                r.currentSlide - (r.options.slidesToShow / 2 + 1)
              )),
              (n = 2 + (r.options.slidesToShow / 2 + 1) + r.currentSlide))
          : ((s = r.options.infinite
              ? r.options.slidesToShow + r.currentSlide
              : r.currentSlide),
            (n = Math.ceil(s + r.options.slidesToShow)),
            r.options.fade === !0 && (s > 0 && s--, n <= r.slideCount && n++)),
        (t = r.$slider.find(".slick-slide").slice(s, n)),
        "anticipated" === r.options.lazyLoad)
      )
        for (
          var l = s - 1, d = n, a = r.$slider.find(".slick-slide"), c = 0;
          c < r.options.slidesToScroll;
          c++
        )
          l < 0 && (l = r.slideCount - 1),
            (t = t.add(a.eq(l))),
            (t = t.add(a.eq(d))),
            l--,
            d++;
      e(t),
        r.slideCount <= r.options.slidesToShow
          ? ((o = r.$slider.find(".slick-slide")), e(o))
          : r.currentSlide >= r.slideCount - r.options.slidesToShow
          ? ((o = r.$slider
              .find(".slick-cloned")
              .slice(0, r.options.slidesToShow)),
            e(o))
          : 0 === r.currentSlide &&
            ((o = r.$slider
              .find(".slick-cloned")
              .slice(r.options.slidesToShow * -1)),
            e(o));
    }),
    (e.prototype.loadSlider = function () {
      var i = this;
      i.setPosition(),
        i.$slideTrack.css({ opacity: 1 }),
        i.$slider.removeClass("slick-loading"),
        i.initUI(),
        "progressive" === i.options.lazyLoad && i.progressiveLazyLoad();
    }),
    (e.prototype.next = e.prototype.slickNext =
      function () {
        var i = this;
        i.changeSlide({ data: { message: "next" } });
      }),
    (e.prototype.orientationChange = function () {
      var i = this;
      i.checkResponsive(), i.setPosition();
    }),
    (e.prototype.pause = e.prototype.slickPause =
      function () {
        var i = this;
        i.autoPlayClear(), (i.paused = !0);
      }),
    (e.prototype.play = e.prototype.slickPlay =
      function () {
        var i = this;
        i.autoPlay(),
          (i.options.autoplay = !0),
          (i.paused = !1),
          (i.focussed = !1),
          (i.interrupted = !1);
      }),
    (e.prototype.postSlide = function (e) {
      var t = this;
      if (
        !t.unslicked &&
        (t.$slider.trigger("afterChange", [t, e]),
        (t.animating = !1),
        t.slideCount > t.options.slidesToShow && t.setPosition(),
        (t.swipeLeft = null),
        t.options.autoplay && t.autoPlay(),
        t.options.accessibility === !0 &&
          (t.initADA(), t.options.focusOnChange))
      ) {
        var o = i(t.$slides.get(t.currentSlide));
        o.attr("tabindex", 0).focus();
      }
    }),
    (e.prototype.prev = e.prototype.slickPrev =
      function () {
        var i = this;
        i.changeSlide({ data: { message: "previous" } });
      }),
    (e.prototype.preventDefault = function (i) {
      i.preventDefault();
    }),
    (e.prototype.progressiveLazyLoad = function (e) {
      e = e || 1;
      var t,
        o,
        s,
        n,
        r,
        l = this,
        d = i("img[data-lazy]", l.$slider);
      d.length
        ? ((t = d.first()),
          (o = t.attr("data-lazy")),
          (s = t.attr("data-srcset")),
          (n = t.attr("data-sizes") || l.$slider.attr("data-sizes")),
          (r = document.createElement("img")),
          (r.onload = function () {
            s && (t.attr("srcset", s), n && t.attr("sizes", n)),
              t
                .attr("src", o)
                .removeAttr("data-lazy data-srcset data-sizes")
                .removeClass("slick-loading"),
              l.options.adaptiveHeight === !0 && l.setPosition(),
              l.$slider.trigger("lazyLoaded", [l, t, o]),
              l.progressiveLazyLoad();
          }),
          (r.onerror = function () {
            e < 3
              ? setTimeout(function () {
                  l.progressiveLazyLoad(e + 1);
                }, 500)
              : (t
                  .removeAttr("data-lazy")
                  .removeClass("slick-loading")
                  .addClass("slick-lazyload-error"),
                l.$slider.trigger("lazyLoadError", [l, t, o]),
                l.progressiveLazyLoad());
          }),
          (r.src = o))
        : l.$slider.trigger("allImagesLoaded", [l]);
    }),
    (e.prototype.refresh = function (e) {
      var t,
        o,
        s = this;
      (o = s.slideCount - s.options.slidesToShow),
        !s.options.infinite && s.currentSlide > o && (s.currentSlide = o),
        s.slideCount <= s.options.slidesToShow && (s.currentSlide = 0),
        (t = s.currentSlide),
        s.destroy(!0),
        i.extend(s, s.initials, { currentSlide: t }),
        s.init(),
        e || s.changeSlide({ data: { message: "index", index: t } }, !1);
    }),
    (e.prototype.registerBreakpoints = function () {
      var e,
        t,
        o,
        s = this,
        n = s.options.responsive || null;
      if ("array" === i.type(n) && n.length) {
        s.respondTo = s.options.respondTo || "window";
        for (e in n)
          if (((o = s.breakpoints.length - 1), n.hasOwnProperty(e))) {
            for (t = n[e].breakpoint; o >= 0; )
              s.breakpoints[o] &&
                s.breakpoints[o] === t &&
                s.breakpoints.splice(o, 1),
                o--;
            s.breakpoints.push(t), (s.breakpointSettings[t] = n[e].settings);
          }
        s.breakpoints.sort(function (i, e) {
          return s.options.mobileFirst ? i - e : e - i;
        });
      }
    }),
    (e.prototype.reinit = function () {
      var e = this;
      (e.$slides = e.$slideTrack
        .children(e.options.slide)
        .addClass("slick-slide")),
        (e.slideCount = e.$slides.length),
        e.currentSlide >= e.slideCount &&
          0 !== e.currentSlide &&
          (e.currentSlide = e.currentSlide - e.options.slidesToScroll),
        e.slideCount <= e.options.slidesToShow && (e.currentSlide = 0),
        e.registerBreakpoints(),
        e.setProps(),
        e.setupInfinite(),
        e.buildArrows(),
        e.updateArrows(),
        e.initArrowEvents(),
        e.buildDots(),
        e.updateDots(),
        e.initDotEvents(),
        e.cleanUpSlideEvents(),
        e.initSlideEvents(),
        e.checkResponsive(!1, !0),
        e.options.focusOnSelect === !0 &&
          i(e.$slideTrack).children().on("click.slick", e.selectHandler),
        e.setSlideClasses(
          "number" == typeof e.currentSlide ? e.currentSlide : 0
        ),
        e.setPosition(),
        e.focusHandler(),
        (e.paused = !e.options.autoplay),
        e.autoPlay(),
        e.$slider.trigger("reInit", [e]);
    }),
    (e.prototype.resize = function () {
      var e = this;
      i(window).width() !== e.windowWidth &&
        (clearTimeout(e.windowDelay),
        (e.windowDelay = window.setTimeout(function () {
          (e.windowWidth = i(window).width()),
            e.checkResponsive(),
            e.unslicked || e.setPosition();
        }, 50)));
    }),
    (e.prototype.removeSlide = e.prototype.slickRemove =
      function (i, e, t) {
        var o = this;
        return (
          "boolean" == typeof i
            ? ((e = i), (i = e === !0 ? 0 : o.slideCount - 1))
            : (i = e === !0 ? --i : i),
          !(o.slideCount < 1 || i < 0 || i > o.slideCount - 1) &&
            (o.unload(),
            t === !0
              ? o.$slideTrack.children().remove()
              : o.$slideTrack.children(this.options.slide).eq(i).remove(),
            (o.$slides = o.$slideTrack.children(this.options.slide)),
            o.$slideTrack.children(this.options.slide).detach(),
            o.$slideTrack.append(o.$slides),
            (o.$slidesCache = o.$slides),
            void o.reinit())
        );
      }),
    (e.prototype.setCSS = function (i) {
      var e,
        t,
        o = this,
        s = {};
      o.options.rtl === !0 && (i = -i),
        (e = "left" == o.positionProp ? Math.ceil(i) + "px" : "0px"),
        (t = "top" == o.positionProp ? Math.ceil(i) + "px" : "0px"),
        (s[o.positionProp] = i),
        o.transformsEnabled === !1
          ? o.$slideTrack.css(s)
          : ((s = {}),
            o.cssTransitions === !1
              ? ((s[o.animType] = "translate(" + e + ", " + t + ")"),
                o.$slideTrack.css(s))
              : ((s[o.animType] = "translate3d(" + e + ", " + t + ", 0px)"),
                o.$slideTrack.css(s)));
    }),
    (e.prototype.setDimensions = function () {
      var i = this;
      i.options.vertical === !1
        ? i.options.centerMode === !0 &&
          i.$list.css({ padding: "0px " + i.options.centerPadding })
        : (i.$list.height(
            i.$slides.first().outerHeight(!0) * i.options.slidesToShow
          ),
          i.options.centerMode === !0 &&
            i.$list.css({ padding: i.options.centerPadding + " 0px" })),
        (i.listWidth = i.$list.width()),
        (i.listHeight = i.$list.height()),
        i.options.vertical === !1 && i.options.variableWidth === !1
          ? ((i.slideWidth = Math.ceil(i.listWidth / i.options.slidesToShow)),
            i.$slideTrack.width(
              Math.ceil(
                i.slideWidth * i.$slideTrack.children(".slick-slide").length
              )
            ))
          : i.options.variableWidth === !0
          ? i.$slideTrack.width(5e3 * i.slideCount)
          : ((i.slideWidth = Math.ceil(i.listWidth)),
            i.$slideTrack.height(
              Math.ceil(
                i.$slides.first().outerHeight(!0) *
                  i.$slideTrack.children(".slick-slide").length
              )
            ));
      var e = i.$slides.first().outerWidth(!0) - i.$slides.first().width();
      i.options.variableWidth === !1 &&
        i.$slideTrack.children(".slick-slide").width(i.slideWidth - e);
    }),
    (e.prototype.setFade = function () {
      var e,
        t = this;
      t.$slides.each(function (o, s) {
        (e = t.slideWidth * o * -1),
          t.options.rtl === !0
            ? i(s).css({
                position: "relative",
                right: e,
                top: 0,
                zIndex: t.options.zIndex - 2,
                opacity: 0,
              })
            : i(s).css({
                position: "relative",
                left: e,
                top: 0,
                zIndex: t.options.zIndex - 2,
                opacity: 0,
              });
      }),
        t.$slides
          .eq(t.currentSlide)
          .css({ zIndex: t.options.zIndex - 1, opacity: 1 });
    }),
    (e.prototype.setHeight = function () {
      var i = this;
      if (
        1 === i.options.slidesToShow &&
        i.options.adaptiveHeight === !0 &&
        i.options.vertical === !1
      ) {
        var e = i.$slides.eq(i.currentSlide).outerHeight(!0);
        i.$list.css("height", e);
      }
    }),
    (e.prototype.setOption = e.prototype.slickSetOption =
      function () {
        var e,
          t,
          o,
          s,
          n,
          r = this,
          l = !1;
        if (
          ("object" === i.type(arguments[0])
            ? ((o = arguments[0]), (l = arguments[1]), (n = "multiple"))
            : "string" === i.type(arguments[0]) &&
              ((o = arguments[0]),
              (s = arguments[1]),
              (l = arguments[2]),
              "responsive" === arguments[0] && "array" === i.type(arguments[1])
                ? (n = "responsive")
                : "undefined" != typeof arguments[1] && (n = "single")),
          "single" === n)
        )
          r.options[o] = s;
        else if ("multiple" === n)
          i.each(o, function (i, e) {
            r.options[i] = e;
          });
        else if ("responsive" === n)
          for (t in s)
            if ("array" !== i.type(r.options.responsive))
              r.options.responsive = [s[t]];
            else {
              for (e = r.options.responsive.length - 1; e >= 0; )
                r.options.responsive[e].breakpoint === s[t].breakpoint &&
                  r.options.responsive.splice(e, 1),
                  e--;
              r.options.responsive.push(s[t]);
            }
        l && (r.unload(), r.reinit());
      }),
    (e.prototype.setPosition = function () {
      var i = this;
      i.setDimensions(),
        i.setHeight(),
        i.options.fade === !1
          ? i.setCSS(i.getLeft(i.currentSlide))
          : i.setFade(),
        i.$slider.trigger("setPosition", [i]);
    }),
    (e.prototype.setProps = function () {
      var i = this,
        e = document.body.style;
      (i.positionProp = i.options.vertical === !0 ? "top" : "left"),
        "top" === i.positionProp
          ? i.$slider.addClass("slick-vertical")
          : i.$slider.removeClass("slick-vertical"),
        (void 0 === e.WebkitTransition &&
          void 0 === e.MozTransition &&
          void 0 === e.msTransition) ||
          (i.options.useCSS === !0 && (i.cssTransitions = !0)),
        i.options.fade &&
          ("number" == typeof i.options.zIndex
            ? i.options.zIndex < 3 && (i.options.zIndex = 3)
            : (i.options.zIndex = i.defaults.zIndex)),
        void 0 !== e.OTransform &&
          ((i.animType = "OTransform"),
          (i.transformType = "-o-transform"),
          (i.transitionType = "OTransition"),
          void 0 === e.perspectiveProperty &&
            void 0 === e.webkitPerspective &&
            (i.animType = !1)),
        void 0 !== e.MozTransform &&
          ((i.animType = "MozTransform"),
          (i.transformType = "-moz-transform"),
          (i.transitionType = "MozTransition"),
          void 0 === e.perspectiveProperty &&
            void 0 === e.MozPerspective &&
            (i.animType = !1)),
        void 0 !== e.webkitTransform &&
          ((i.animType = "webkitTransform"),
          (i.transformType = "-webkit-transform"),
          (i.transitionType = "webkitTransition"),
          void 0 === e.perspectiveProperty &&
            void 0 === e.webkitPerspective &&
            (i.animType = !1)),
        void 0 !== e.msTransform &&
          ((i.animType = "msTransform"),
          (i.transformType = "-ms-transform"),
          (i.transitionType = "msTransition"),
          void 0 === e.msTransform && (i.animType = !1)),
        void 0 !== e.transform &&
          i.animType !== !1 &&
          ((i.animType = "transform"),
          (i.transformType = "transform"),
          (i.transitionType = "transition")),
        (i.transformsEnabled =
          i.options.useTransform && null !== i.animType && i.animType !== !1);
    }),
    (e.prototype.setSlideClasses = function (i) {
      var e,
        t,
        o,
        s,
        n = this;
      if (
        ((t = n.$slider
          .find(".slick-slide")
          .removeClass("slick-active slick-center slick-current")
          .attr("aria-hidden", "true")),
        n.$slides.eq(i).addClass("slick-current"),
        n.options.centerMode === !0)
      ) {
        var r = n.options.slidesToShow % 2 === 0 ? 1 : 0;
        (e = Math.floor(n.options.slidesToShow / 2)),
          n.options.infinite === !0 &&
            (i >= e && i <= n.slideCount - 1 - e
              ? n.$slides
                  .slice(i - e + r, i + e + 1)
                  .addClass("slick-active")
                  .attr("aria-hidden", "false")
              : ((o = n.options.slidesToShow + i),
                t
                  .slice(o - e + 1 + r, o + e + 2)
                  .addClass("slick-active")
                  .attr("aria-hidden", "false")),
            0 === i
              ? t
                  .eq(t.length - 1 - n.options.slidesToShow)
                  .addClass("slick-center")
              : i === n.slideCount - 1 &&
                t.eq(n.options.slidesToShow).addClass("slick-center")),
          n.$slides.eq(i).addClass("slick-center");
      } else
        i >= 0 && i <= n.slideCount - n.options.slidesToShow
          ? n.$slides
              .slice(i, i + n.options.slidesToShow)
              .addClass("slick-active")
              .attr("aria-hidden", "false")
          : t.length <= n.options.slidesToShow
          ? t.addClass("slick-active").attr("aria-hidden", "false")
          : ((s = n.slideCount % n.options.slidesToShow),
            (o = n.options.infinite === !0 ? n.options.slidesToShow + i : i),
            n.options.slidesToShow == n.options.slidesToScroll &&
            n.slideCount - i < n.options.slidesToShow
              ? t
                  .slice(o - (n.options.slidesToShow - s), o + s)
                  .addClass("slick-active")
                  .attr("aria-hidden", "false")
              : t
                  .slice(o, o + n.options.slidesToShow)
                  .addClass("slick-active")
                  .attr("aria-hidden", "false"));
      ("ondemand" !== n.options.lazyLoad &&
        "anticipated" !== n.options.lazyLoad) ||
        n.lazyLoad();
    }),
    (e.prototype.setupInfinite = function () {
      var e,
        t,
        o,
        s = this;
      if (
        (s.options.fade === !0 && (s.options.centerMode = !1),
        s.options.infinite === !0 &&
          s.options.fade === !1 &&
          ((t = null), s.slideCount > s.options.slidesToShow))
      ) {
        for (
          o =
            s.options.centerMode === !0
              ? s.options.slidesToShow + 1
              : s.options.slidesToShow,
            e = s.slideCount;
          e > s.slideCount - o;
          e -= 1
        )
          (t = e - 1),
            i(s.$slides[t])
              .clone(!0)
              .attr("id", "")
              .attr("data-slick-index", t - s.slideCount)
              .prependTo(s.$slideTrack)
              .addClass("slick-cloned");
        for (e = 0; e < o + s.slideCount; e += 1)
          (t = e),
            i(s.$slides[t])
              .clone(!0)
              .attr("id", "")
              .attr("data-slick-index", t + s.slideCount)
              .appendTo(s.$slideTrack)
              .addClass("slick-cloned");
        s.$slideTrack
          .find(".slick-cloned")
          .find("[id]")
          .each(function () {
            i(this).attr("id", "");
          });
      }
    }),
    (e.prototype.interrupt = function (i) {
      var e = this;
      i || e.autoPlay(), (e.interrupted = i);
    }),
    (e.prototype.selectHandler = function (e) {
      var t = this,
        o = i(e.target).is(".slick-slide")
          ? i(e.target)
          : i(e.target).parents(".slick-slide"),
        s = parseInt(o.attr("data-slick-index"));
      return (
        s || (s = 0),
        t.slideCount <= t.options.slidesToShow
          ? void t.slideHandler(s, !1, !0)
          : void t.slideHandler(s)
      );
    }),
    (e.prototype.slideHandler = function (i, e, t) {
      var o,
        s,
        n,
        r,
        l,
        d = null,
        a = this;
      if (
        ((e = e || !1),
        !(
          (a.animating === !0 && a.options.waitForAnimate === !0) ||
          (a.options.fade === !0 && a.currentSlide === i)
        ))
      )
        return (
          e === !1 && a.asNavFor(i),
          (o = i),
          (d = a.getLeft(o)),
          (r = a.getLeft(a.currentSlide)),
          (a.currentLeft = null === a.swipeLeft ? r : a.swipeLeft),
          a.options.infinite === !1 &&
          a.options.centerMode === !1 &&
          (i < 0 || i > a.getDotCount() * a.options.slidesToScroll)
            ? void (
                a.options.fade === !1 &&
                ((o = a.currentSlide),
                t !== !0 && a.slideCount > a.options.slidesToShow
                  ? a.animateSlide(r, function () {
                      a.postSlide(o);
                    })
                  : a.postSlide(o))
              )
            : a.options.infinite === !1 &&
              a.options.centerMode === !0 &&
              (i < 0 || i > a.slideCount - a.options.slidesToScroll)
            ? void (
                a.options.fade === !1 &&
                ((o = a.currentSlide),
                t !== !0 && a.slideCount > a.options.slidesToShow
                  ? a.animateSlide(r, function () {
                      a.postSlide(o);
                    })
                  : a.postSlide(o))
              )
            : (a.options.autoplay && clearInterval(a.autoPlayTimer),
              (s =
                o < 0
                  ? a.slideCount % a.options.slidesToScroll !== 0
                    ? a.slideCount - (a.slideCount % a.options.slidesToScroll)
                    : a.slideCount + o
                  : o >= a.slideCount
                  ? a.slideCount % a.options.slidesToScroll !== 0
                    ? 0
                    : o - a.slideCount
                  : o),
              (a.animating = !0),
              a.$slider.trigger("beforeChange", [a, a.currentSlide, s]),
              (n = a.currentSlide),
              (a.currentSlide = s),
              a.setSlideClasses(a.currentSlide),
              a.options.asNavFor &&
                ((l = a.getNavTarget()),
                (l = l.slick("getSlick")),
                l.slideCount <= l.options.slidesToShow &&
                  l.setSlideClasses(a.currentSlide)),
              a.updateDots(),
              a.updateArrows(),
              a.options.fade === !0
                ? (t !== !0
                    ? (a.fadeSlideOut(n),
                      a.fadeSlide(s, function () {
                        a.postSlide(s);
                      }))
                    : a.postSlide(s),
                  void a.animateHeight())
                : void (t !== !0 && a.slideCount > a.options.slidesToShow
                    ? a.animateSlide(d, function () {
                        a.postSlide(s);
                      })
                    : a.postSlide(s)))
        );
    }),
    (e.prototype.startLoad = function () {
      var i = this;
      i.options.arrows === !0 &&
        i.slideCount > i.options.slidesToShow &&
        (i.$prevArrow.hide(), i.$nextArrow.hide()),
        i.options.dots === !0 &&
          i.slideCount > i.options.slidesToShow &&
          i.$dots.hide(),
        i.$slider.addClass("slick-loading");
    }),
    (e.prototype.swipeDirection = function () {
      var i,
        e,
        t,
        o,
        s = this;
      return (
        (i = s.touchObject.startX - s.touchObject.curX),
        (e = s.touchObject.startY - s.touchObject.curY),
        (t = Math.atan2(e, i)),
        (o = Math.round((180 * t) / Math.PI)),
        o < 0 && (o = 360 - Math.abs(o)),
        o <= 45 && o >= 0
          ? s.options.rtl === !1
            ? "left"
            : "right"
          : o <= 360 && o >= 315
          ? s.options.rtl === !1
            ? "left"
            : "right"
          : o >= 135 && o <= 225
          ? s.options.rtl === !1
            ? "right"
            : "left"
          : s.options.verticalSwiping === !0
          ? o >= 35 && o <= 135
            ? "down"
            : "up"
          : "vertical"
      );
    }),
    (e.prototype.swipeEnd = function (i) {
      var e,
        t,
        o = this;
      if (((o.dragging = !1), (o.swiping = !1), o.scrolling))
        return (o.scrolling = !1), !1;
      if (
        ((o.interrupted = !1),
        (o.shouldClick = !(o.touchObject.swipeLength > 10)),
        void 0 === o.touchObject.curX)
      )
        return !1;
      if (
        (o.touchObject.edgeHit === !0 &&
          o.$slider.trigger("edge", [o, o.swipeDirection()]),
        o.touchObject.swipeLength >= o.touchObject.minSwipe)
      ) {
        switch ((t = o.swipeDirection())) {
          case "left":
          case "down":
            (e = o.options.swipeToSlide
              ? o.checkNavigable(o.currentSlide + o.getSlideCount())
              : o.currentSlide + o.getSlideCount()),
              (o.currentDirection = 0);
            break;
          case "right":
          case "up":
            (e = o.options.swipeToSlide
              ? o.checkNavigable(o.currentSlide - o.getSlideCount())
              : o.currentSlide - o.getSlideCount()),
              (o.currentDirection = 1);
        }
        "vertical" != t &&
          (o.slideHandler(e),
          (o.touchObject = {}),
          o.$slider.trigger("swipe", [o, t]));
      } else
        o.touchObject.startX !== o.touchObject.curX &&
          (o.slideHandler(o.currentSlide), (o.touchObject = {}));
    }),
    (e.prototype.swipeHandler = function (i) {
      var e = this;
      if (
        !(
          e.options.swipe === !1 ||
          ("ontouchend" in document && e.options.swipe === !1) ||
          (e.options.draggable === !1 && i.type.indexOf("mouse") !== -1)
        )
      )
        switch (
          ((e.touchObject.fingerCount =
            i.originalEvent && void 0 !== i.originalEvent.touches
              ? i.originalEvent.touches.length
              : 1),
          (e.touchObject.minSwipe = e.listWidth / e.options.touchThreshold),
          e.options.verticalSwiping === !0 &&
            (e.touchObject.minSwipe = e.listHeight / e.options.touchThreshold),
          i.data.action)
        ) {
          case "start":
            e.swipeStart(i);
            break;
          case "move":
            e.swipeMove(i);
            break;
          case "end":
            e.swipeEnd(i);
        }
    }),
    (e.prototype.swipeMove = function (i) {
      var e,
        t,
        o,
        s,
        n,
        r,
        l = this;
      return (
        (n = void 0 !== i.originalEvent ? i.originalEvent.touches : null),
        !(!l.dragging || l.scrolling || (n && 1 !== n.length)) &&
          ((e = l.getLeft(l.currentSlide)),
          (l.touchObject.curX = void 0 !== n ? n[0].pageX : i.clientX),
          (l.touchObject.curY = void 0 !== n ? n[0].pageY : i.clientY),
          (l.touchObject.swipeLength = Math.round(
            Math.sqrt(Math.pow(l.touchObject.curX - l.touchObject.startX, 2))
          )),
          (r = Math.round(
            Math.sqrt(Math.pow(l.touchObject.curY - l.touchObject.startY, 2))
          )),
          !l.options.verticalSwiping && !l.swiping && r > 4
            ? ((l.scrolling = !0), !1)
            : (l.options.verticalSwiping === !0 &&
                (l.touchObject.swipeLength = r),
              (t = l.swipeDirection()),
              void 0 !== i.originalEvent &&
                l.touchObject.swipeLength > 4 &&
                ((l.swiping = !0), i.preventDefault()),
              (s =
                (l.options.rtl === !1 ? 1 : -1) *
                (l.touchObject.curX > l.touchObject.startX ? 1 : -1)),
              l.options.verticalSwiping === !0 &&
                (s = l.touchObject.curY > l.touchObject.startY ? 1 : -1),
              (o = l.touchObject.swipeLength),
              (l.touchObject.edgeHit = !1),
              l.options.infinite === !1 &&
                ((0 === l.currentSlide && "right" === t) ||
                  (l.currentSlide >= l.getDotCount() && "left" === t)) &&
                ((o = l.touchObject.swipeLength * l.options.edgeFriction),
                (l.touchObject.edgeHit = !0)),
              l.options.vertical === !1
                ? (l.swipeLeft = e + o * s)
                : (l.swipeLeft = e + o * (l.$list.height() / l.listWidth) * s),
              l.options.verticalSwiping === !0 && (l.swipeLeft = e + o * s),
              l.options.fade !== !0 &&
                l.options.touchMove !== !1 &&
                (l.animating === !0
                  ? ((l.swipeLeft = null), !1)
                  : void l.setCSS(l.swipeLeft))))
      );
    }),
    (e.prototype.swipeStart = function (i) {
      var e,
        t = this;
      return (
        (t.interrupted = !0),
        1 !== t.touchObject.fingerCount ||
        t.slideCount <= t.options.slidesToShow
          ? ((t.touchObject = {}), !1)
          : (void 0 !== i.originalEvent &&
              void 0 !== i.originalEvent.touches &&
              (e = i.originalEvent.touches[0]),
            (t.touchObject.startX = t.touchObject.curX =
              void 0 !== e ? e.pageX : i.clientX),
            (t.touchObject.startY = t.touchObject.curY =
              void 0 !== e ? e.pageY : i.clientY),
            void (t.dragging = !0))
      );
    }),
    (e.prototype.unfilterSlides = e.prototype.slickUnfilter =
      function () {
        var i = this;
        null !== i.$slidesCache &&
          (i.unload(),
          i.$slideTrack.children(this.options.slide).detach(),
          i.$slidesCache.appendTo(i.$slideTrack),
          i.reinit());
      }),
    (e.prototype.unload = function () {
      var e = this;
      i(".slick-cloned", e.$slider).remove(),
        e.$dots && e.$dots.remove(),
        e.$prevArrow &&
          e.htmlExpr.test(e.options.prevArrow) &&
          e.$prevArrow.remove(),
        e.$nextArrow &&
          e.htmlExpr.test(e.options.nextArrow) &&
          e.$nextArrow.remove(),
        e.$slides
          .removeClass("slick-slide slick-active slick-visible slick-current")
          .attr("aria-hidden", "true")
          .css("width", "");
    }),
    (e.prototype.unslick = function (i) {
      var e = this;
      e.$slider.trigger("unslick", [e, i]), e.destroy();
    }),
    (e.prototype.updateArrows = function () {
      var i,
        e = this;
      (i = Math.floor(e.options.slidesToShow / 2)),
        e.options.arrows === !0 &&
          e.slideCount > e.options.slidesToShow &&
          !e.options.infinite &&
          (e.$prevArrow
            .removeClass("slick-disabled")
            .attr("aria-disabled", "false"),
          e.$nextArrow
            .removeClass("slick-disabled")
            .attr("aria-disabled", "false"),
          0 === e.currentSlide
            ? (e.$prevArrow
                .addClass("slick-disabled")
                .attr("aria-disabled", "true"),
              e.$nextArrow
                .removeClass("slick-disabled")
                .attr("aria-disabled", "false"))
            : e.currentSlide >= e.slideCount - e.options.slidesToShow &&
              e.options.centerMode === !1
            ? (e.$nextArrow
                .addClass("slick-disabled")
                .attr("aria-disabled", "true"),
              e.$prevArrow
                .removeClass("slick-disabled")
                .attr("aria-disabled", "false"))
            : e.currentSlide >= e.slideCount - 1 &&
              e.options.centerMode === !0 &&
              (e.$nextArrow
                .addClass("slick-disabled")
                .attr("aria-disabled", "true"),
              e.$prevArrow
                .removeClass("slick-disabled")
                .attr("aria-disabled", "false")));
    }),
    (e.prototype.updateDots = function () {
      var i = this;
      null !== i.$dots &&
        (i.$dots.find("li").removeClass("slick-active").end(),
        i.$dots
          .find("li")
          .eq(Math.floor(i.currentSlide / i.options.slidesToScroll))
          .addClass("slick-active"));
    }),
    (e.prototype.visibility = function () {
      var i = this;
      i.options.autoplay &&
        (document[i.hidden] ? (i.interrupted = !0) : (i.interrupted = !1));
    }),
    (i.fn.slick = function () {
      var i,
        t,
        o = this,
        s = arguments[0],
        n = Array.prototype.slice.call(arguments, 1),
        r = o.length;
      for (i = 0; i < r; i++)
        if (
          ("object" == typeof s || "undefined" == typeof s
            ? (o[i].slick = new e(o[i], s))
            : (t = o[i].slick[s].apply(o[i].slick, n)),
          "undefined" != typeof t)
        )
          return t;
      return o;
    });
});
(function (root, factory) {
  "use strict";
  if (typeof define === "function" && define.amd) {
    define(["jquery"], factory);
  } else if (typeof exports === "object") {
    module.exports = factory(require("jquery"));
  } else {
    root.SlideAccordion = factory(jQuery);
  }
})(this, function ($) {
  "use strict";
  var accHiddenClass = "js-acc-hidden";
  function SlideAccordion(options) {
    this.options = $.extend(
      true,
      {
        allowClickWhenExpanded: false,
        activeClass: "active",
        opener: ".opener",
        slider: ".slide",
        animSpeed: 300,
        collapsible: true,
        event: "click",
        scrollToActiveItem: {
          enable: false,
          breakpoint: 767,
          animSpeed: 600,
          extraOffset: null,
        },
      },
      options
    );
    this.init();
  }
  SlideAccordion.prototype = {
    init: function () {
      if (this.options.holder) {
        this.findElements();
        this.setStateOnInit();
        this.attachEvents();
        this.makeCallback("onInit");
      }
    },
    findElements: function () {
      this.$holder = $(this.options.holder).data("SlideAccordion", this);
      this.$items = this.$holder.find(":has(" + this.options.slider + ")");
    },
    setStateOnInit: function () {
      var self = this;
      this.$items.each(function () {
        if (!$(this).hasClass(self.options.activeClass)) {
          $(this).find(self.options.slider).addClass(accHiddenClass);
        }
      });
    },
    attachEvents: function () {
      var self = this;
      this.accordionToggle = function (e) {
        var $item = jQuery(this).closest(self.$items);
        var $actiItem = self.getActiveItem($item);
        if (
          !self.options.allowClickWhenExpanded ||
          !$item.hasClass(self.options.activeClass)
        ) {
          e.preventDefault();
          self.toggle($item, $actiItem);
        }
      };
      this.$items.on(
        this.options.event,
        this.options.opener,
        this.accordionToggle
      );
    },
    toggle: function ($item, $prevItem) {
      if (!$item.hasClass(this.options.activeClass)) {
        this.show($item);
      } else if (this.options.collapsible) {
        this.hide($item);
      }
      if (!$item.is($prevItem) && $prevItem.length) {
        this.hide($prevItem);
      }
      this.makeCallback("beforeToggle");
    },
    show: function ($item) {
      var $slider = $item.find(this.options.slider);
      $item.addClass(this.options.activeClass);
      $slider
        .stop()
        .hide()
        .removeClass(accHiddenClass)
        .slideDown({
          duration: this.options.animSpeed,
          complete: function () {
            $slider.removeAttr("style");
            if (
              this.options.scrollToActiveItem.enable &&
              window.innerWidth <= this.options.scrollToActiveItem.breakpoint
            ) {
              this.goToItem($item);
            }
            this.makeCallback("onShow", $item);
          }.bind(this),
        });
      this.makeCallback("beforeShow", $item);
    },
    hide: function ($item) {
      var $slider = $item.find(this.options.slider);
      $item.removeClass(this.options.activeClass);
      $slider
        .stop()
        .show()
        .slideUp({
          duration: this.options.animSpeed,
          complete: function () {
            $slider.addClass(accHiddenClass);
            $slider.removeAttr("style");
            this.makeCallback("onHide", $item);
          }.bind(this),
        });
      this.makeCallback("beforeHide", $item);
    },
    goToItem: function ($item) {
      var itemOffset = $item.offset().top;
      if (itemOffset < $(window).scrollTop()) {
        if (typeof this.options.scrollToActiveItem.extraOffset === "number") {
          itemOffset -= this.options.scrollToActiveItem.extraOffset;
        } else if (
          typeof this.options.scrollToActiveItem.extraOffset === "function"
        ) {
          itemOffset -= this.options.scrollToActiveItem.extraOffset();
        }
        $("body, html").animate(
          { scrollTop: itemOffset },
          this.options.scrollToActiveItem.animSpeed
        );
      }
    },
    getActiveItem: function ($item) {
      return $item.siblings().filter("." + this.options.activeClass);
    },
    makeCallback: function (name) {
      if (typeof this.options[name] === "function") {
        var args = Array.prototype.slice.call(arguments);
        args.shift();
        this.options[name].apply(this, args);
      }
    },
    destroy: function () {
      this.$holder.removeData("SlideAccordion");
      this.$items.off(
        this.options.event,
        this.options.opener,
        this.accordionToggle
      );
      this.$items.removeClass(this.options.activeClass).each(
        function (i, item) {
          $(item)
            .find(this.options.slider)
            .removeAttr("style")
            .removeClass(accHiddenClass);
        }.bind(this)
      );
      this.makeCallback("onDestroy");
    },
  };
  $.fn.slideAccordion = function (opt) {
    var args = Array.prototype.slice.call(arguments);
    var method = args[0];
    return this.each(function () {
      var $holder = jQuery(this);
      var instance = $holder.data("SlideAccordion");
      if (typeof opt === "object" || typeof opt === "undefined") {
        new SlideAccordion($.extend(true, { holder: this }, opt));
      } else if (typeof method === "string" && instance) {
        if (typeof instance[method] === "function") {
          args.shift();
          instance[method].apply(instance, args);
        }
      }
    });
  };
  (function () {
    var tabStyleSheet = $('<style type="text/css">')[0];
    var tabStyleRule = "." + accHiddenClass;
    tabStyleRule +=
      "{position:absolute !important;left:-9999px !important;top:-9999px !important;display:block !important; width: 100% !important;}";
    if (tabStyleSheet.styleSheet) {
      tabStyleSheet.styleSheet.cssText = tabStyleRule;
    } else {
      tabStyleSheet.appendChild(document.createTextNode(tabStyleRule));
    }
    $("head").append(tabStyleSheet);
  })();
  return SlideAccordion;
});
/*!
 * SmoothScroll module
 */
(function ($, exports) {
  var page,
    win = $(window),
    activeBlock,
    activeWheelHandler,
    wheelEvents =
      "onwheel" in document || document.documentMode >= 9
        ? "wheel"
        : "mousewheel DOMMouseScroll";
  function scrollTo(offset, options, callback) {
    var scrollBlock;
    if (document.body) {
      if (typeof options === "number") {
        options = { duration: options };
      } else {
        options = options || {};
      }
      page = page || $("html, body");
      scrollBlock = options.container || page;
    } else {
      return;
    }
    if (typeof offset === "number") {
      offset = { top: offset };
    }
    if (activeBlock && activeWheelHandler) {
      activeBlock.off(wheelEvents, activeWheelHandler);
    }
    if (options.wheelBehavior && options.wheelBehavior !== "none") {
      activeWheelHandler = function (e) {
        if (options.wheelBehavior === "stop") {
          scrollBlock.off(wheelEvents, activeWheelHandler);
          scrollBlock.stop();
        } else if (options.wheelBehavior === "ignore") {
          e.preventDefault();
        }
      };
      activeBlock = scrollBlock.on(wheelEvents, activeWheelHandler);
    }
    scrollBlock
      .stop()
      .animate(
        { scrollLeft: offset.left, scrollTop: offset.top },
        options.duration,
        function () {
          if (activeWheelHandler) {
            scrollBlock.off(wheelEvents, activeWheelHandler);
          }
          if ($.isFunction(callback)) {
            callback();
          }
        }
      );
  }
  function SmoothScroll(options) {
    this.options = $.extend(
      {
        anchorLinks: 'a[href^="#"]',
        container: null,
        extraOffset: null,
        activeClasses: null,
        easing: "swing",
        animMode: "duration",
        animDuration: 800,
        animSpeed: 1500,
        anchorActiveClass: "anchor-active",
        sectionActiveClass: "section-active",
        wheelBehavior: "stop",
        useNativeAnchorScrolling: false,
      },
      options
    );
    this.init();
  }
  SmoothScroll.prototype = {
    init: function () {
      this.initStructure();
      this.attachEvents();
      this.isInit = true;
    },
    initStructure: function () {
      var self = this;
      this.container = this.options.container
        ? $(this.options.container)
        : $("html,body");
      this.scrollContainer = this.options.container ? this.container : win;
      this.anchorLinks = jQuery(this.options.anchorLinks).filter(function () {
        return jQuery(self.getAnchorTarget(jQuery(this))).length;
      });
    },
    getId: function (str) {
      try {
        return "#" + str.replace(/^.*?(#|$)/, "");
      } catch (err) {
        return null;
      }
    },
    getAnchorTarget: function (link) {
      var targetId = this.getId($(link).attr("href"));
      return $(targetId.length > 1 ? targetId : "html");
    },
    getTargetOffset: function (block) {
      var blockOffset = block.offset().top;
      if (this.options.container) {
        blockOffset -=
          this.container.offset().top - this.container.prop("scrollTop");
      }
      if (typeof this.options.extraOffset === "number") {
        blockOffset -= this.options.extraOffset;
      } else if (typeof this.options.extraOffset === "function") {
        blockOffset -= this.options.extraOffset(block);
      }
      return { top: blockOffset };
    },
    attachEvents: function () {
      var self = this;
      if (this.options.activeClasses && this.anchorLinks.length) {
        this.anchorData = [];
        for (var i = 0; i < this.anchorLinks.length; i++) {
          var link = jQuery(this.anchorLinks[i]),
            targetBlock = self.getAnchorTarget(link),
            anchorDataItem = null;
          $.each(self.anchorData, function (index, item) {
            if (item.block[0] === targetBlock[0]) {
              anchorDataItem = item;
            }
          });
          if (anchorDataItem) {
            anchorDataItem.link = anchorDataItem.link.add(link);
          } else {
            self.anchorData.push({ link: link, block: targetBlock });
          }
        }
        this.resizeHandler = function () {
          if (!self.isInit) return;
          self.recalculateOffsets();
        };
        this.scrollHandler = function () {
          self.refreshActiveClass();
        };
        this.recalculateOffsets();
        this.scrollContainer.on("scroll", this.scrollHandler);
        win.on(
          "resize.SmoothScroll load.SmoothScroll orientationchange.SmoothScroll refreshAnchor.SmoothScroll",
          this.resizeHandler
        );
      }
      this.clickHandler = function (e) {
        self.onClick(e);
      };
      if (!this.options.useNativeAnchorScrolling) {
        this.anchorLinks.on("click", this.clickHandler);
      }
    },
    recalculateOffsets: function () {
      var self = this;
      $.each(this.anchorData, function (index, data) {
        data.offset = self.getTargetOffset(data.block);
        data.height = data.block.outerHeight();
      });
      this.refreshActiveClass();
    },
    toggleActiveClass: function (anchor, block, state) {
      anchor.toggleClass(this.options.anchorActiveClass, state);
      block.toggleClass(this.options.sectionActiveClass, state);
    },
    refreshActiveClass: function () {
      var self = this,
        foundFlag = false,
        containerHeight = this.container.prop("scrollHeight"),
        viewPortHeight = this.scrollContainer.height(),
        scrollTop = this.options.container
          ? this.container.prop("scrollTop")
          : win.scrollTop();
      if (this.options.customScrollHandler) {
        this.options.customScrollHandler.call(this, scrollTop, this.anchorData);
        return;
      }
      this.anchorData.sort(function (a, b) {
        return a.offset.top - b.offset.top;
      });
      $.each(this.anchorData, function (index) {
        var reverseIndex = self.anchorData.length - index - 1,
          data = self.anchorData[reverseIndex],
          anchorElement =
            self.options.activeClasses === "parent"
              ? data.link.parent()
              : data.link;
        if (scrollTop >= containerHeight - viewPortHeight) {
          if (reverseIndex === self.anchorData.length - 1) {
            self.toggleActiveClass(anchorElement, data.block, true);
          } else {
            self.toggleActiveClass(anchorElement, data.block, false);
          }
        } else {
          if (
            !foundFlag &&
            (scrollTop >= data.offset.top - 1 || reverseIndex === 0)
          ) {
            foundFlag = true;
            self.toggleActiveClass(anchorElement, data.block, true);
          } else {
            self.toggleActiveClass(anchorElement, data.block, false);
          }
        }
      });
    },
    calculateScrollDuration: function (offset) {
      var distance;
      if (this.options.animMode === "speed") {
        distance = Math.abs(this.scrollContainer.scrollTop() - offset.top);
        return (distance / this.options.animSpeed) * 1000;
      } else {
        return this.options.animDuration;
      }
    },
    onClick: function (e) {
      var targetBlock = this.getAnchorTarget(e.currentTarget),
        targetOffset = this.getTargetOffset(targetBlock);
      e.preventDefault();
      scrollTo(targetOffset, {
        container: this.container,
        wheelBehavior: this.options.wheelBehavior,
        duration: this.calculateScrollDuration(targetOffset),
      });
      this.makeCallback("onBeforeScroll", e.currentTarget);
    },
    makeCallback: function (name) {
      if (typeof this.options[name] === "function") {
        var args = Array.prototype.slice.call(arguments);
        args.shift();
        this.options[name].apply(this, args);
      }
    },
    destroy: function () {
      var self = this;
      this.isInit = false;
      if (this.options.activeClasses) {
        win.off(
          "resize.SmoothScroll load.SmoothScroll orientationchange.SmoothScroll refreshAnchor.SmoothScroll",
          this.resizeHandler
        );
        this.scrollContainer.off("scroll", this.scrollHandler);
        $.each(this.anchorData, function (index) {
          var reverseIndex = self.anchorData.length - index - 1,
            data = self.anchorData[reverseIndex],
            anchorElement =
              self.options.activeClasses === "parent"
                ? data.link.parent()
                : data.link;
          self.toggleActiveClass(anchorElement, data.block, false);
        });
      }
      this.anchorLinks.off("click", this.clickHandler);
    },
  };
  $.extend(SmoothScroll, {
    scrollTo: function (blockOrOffset, durationOrOptions, callback) {
      scrollTo(blockOrOffset, durationOrOptions, callback);
    },
  });
  exports.SmoothScroll = SmoothScroll;
})(jQuery, this);
(function ($) {
  "use strict";
  var styleRules = {};
  var templates = {
    "2x": [
      "(-webkit-min-device-pixel-ratio: 1.5)",
      "(min-resolution: 192dpi)",
      "(min-device-pixel-ratio: 1.5)",
      "(min-resolution: 1.5dppx)",
    ],
    "3x": [
      "(-webkit-min-device-pixel-ratio: 3)",
      "(min-resolution: 384dpi)",
      "(min-device-pixel-ratio: 3)",
      "(min-resolution: 3dppx)",
    ],
  };
  function addSimple(imageSrc, media, id) {
    var style = buildRule(id, imageSrc);
    addRule(media, style);
  }
  function addRetina(imageData, media, id) {
    var currentRules = templates[imageData[1]].slice();
    var patchedRules = currentRules;
    var style = buildRule(id, imageData[0]);
    if (media !== "default") {
      patchedRules = $.map(currentRules, function (ele, i) {
        return ele + " and " + media;
      });
    }
    media = patchedRules.join(",");
    addRule(media, style);
  }
  function buildRule(id, src) {
    return "#" + id + '{background-image: url("' + src + '");}';
  }
  function addRule(media, rule) {
    var $styleTag = styleRules[media];
    var styleTagData;
    var rules = "";
    if (media === "default") {
      rules = rule + " ";
    } else {
      rules = "@media " + media + "{" + rule + "}";
    }
    if (!$styleTag) {
      styleRules[media] = $("<style>").text(rules).appendTo("head");
    } else {
      styleTagData = $styleTag.text();
      styleTagData =
        styleTagData.substring(0, styleTagData.length - 2) + " }" + rule + "}";
      $styleTag.text(styleTagData);
    }
  }
  $.fn.retinaCover = function () {
    return this.each(function () {
      var $block = $(this);
      var $items = $block.children("[data-srcset]");
      var id = "bg-stretch" + Date.now() + (Math.random() * 1000).toFixed(0);
      if ($items.length) {
        $block.attr("id", id);
        $items.each(function () {
          var $item = $(this);
          var data = $item.data("srcset").split(", ");
          var media = $item.data("media") || "default";
          var dataLength = data.length;
          var itemData;
          var i;
          for (i = 0; i < dataLength; i++) {
            itemData = data[i].split(" ");
            if (itemData.length === 1) {
              addSimple(itemData[0], media, id);
            } else {
              addRetina(itemData, media, id);
            }
          }
        });
      }
      $items.detach();
    });
  };
})(jQuery);
/*! Picturefill - v3.0.1 - 2015-09-30
 * http://scottjehl.github.io/picturefill
 * Copyright (c) 2015 https://github.com/scottjehl/picturefill/blob/master/Authors.txt; Licensed MIT
 */ !(function (a) {
  var b = navigator.userAgent;
  a.HTMLPictureElement &&
    /ecko/.test(b) &&
    b.match(/rv\:(\d+)/) &&
    RegExp.$1 < 41 &&
    addEventListener(
      "resize",
      (function () {
        var b,
          c = document.createElement("source"),
          d = function (a) {
            var b,
              d,
              e = a.parentNode;
            "PICTURE" === e.nodeName.toUpperCase()
              ? ((b = c.cloneNode()),
                e.insertBefore(b, e.firstElementChild),
                setTimeout(function () {
                  e.removeChild(b);
                }))
              : (!a._pfLastSize || a.offsetWidth > a._pfLastSize) &&
                ((a._pfLastSize = a.offsetWidth),
                (d = a.sizes),
                (a.sizes += ",100vw"),
                setTimeout(function () {
                  a.sizes = d;
                }));
          },
          e = function () {
            var a,
              b = document.querySelectorAll(
                "picture > img, img[srcset][sizes]"
              );
            for (a = 0; a < b.length; a++) d(b[a]);
          },
          f = function () {
            clearTimeout(b), (b = setTimeout(e, 99));
          },
          g = a.matchMedia && matchMedia("(orientation: landscape)"),
          h = function () {
            f(), g && g.addListener && g.addListener(f);
          };
        return (
          (c.srcset =
            "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="),
          /^[c|i]|d$/.test(document.readyState || "")
            ? h()
            : document.addEventListener("DOMContentLoaded", h),
          f
        );
      })()
    );
})(window),
  (function (a, b, c) {
    "use strict";
    function d(a) {
      return " " === a || "	" === a || "\n" === a || "\f" === a || "\r" === a;
    }
    function e(b, c) {
      var d = new a.Image();
      return (
        (d.onerror = function () {
          (z[b] = !1), aa();
        }),
        (d.onload = function () {
          (z[b] = 1 === d.width), aa();
        }),
        (d.src = c),
        "pending"
      );
    }
    function f() {
      (L = !1),
        (O = a.devicePixelRatio),
        (M = {}),
        (N = {}),
        (s.DPR = O || 1),
        (P.width = Math.max(a.innerWidth || 0, y.clientWidth)),
        (P.height = Math.max(a.innerHeight || 0, y.clientHeight)),
        (P.vw = P.width / 100),
        (P.vh = P.height / 100),
        (r = [P.height, P.width, O].join("-")),
        (P.em = s.getEmValue()),
        (P.rem = P.em);
    }
    function g(a, b, c, d) {
      var e, f, g, h;
      return (
        "saveData" === A.algorithm
          ? a > 2.7
            ? (h = c + 1)
            : ((f = b - c),
              (e = Math.pow(a - 0.6, 1.5)),
              (g = f * e),
              d && (g += 0.1 * e),
              (h = a + g))
          : (h = c > 1 ? Math.sqrt(a * b) : a),
        h > c
      );
    }
    function h(a) {
      var b,
        c = s.getSet(a),
        d = !1;
      "pending" !== c &&
        ((d = r), c && ((b = s.setRes(c)), s.applySetCandidate(b, a))),
        (a[s.ns].evaled = d);
    }
    function i(a, b) {
      return a.res - b.res;
    }
    function j(a, b, c) {
      var d;
      return (
        !c && b && ((c = a[s.ns].sets), (c = c && c[c.length - 1])),
        (d = k(b, c)),
        d &&
          ((b = s.makeUrl(b)),
          (a[s.ns].curSrc = b),
          (a[s.ns].curCan = d),
          d.res || _(d, d.set.sizes)),
        d
      );
    }
    function k(a, b) {
      var c, d, e;
      if (a && b)
        for (e = s.parseSet(b), a = s.makeUrl(a), c = 0; c < e.length; c++)
          if (a === s.makeUrl(e[c].url)) {
            d = e[c];
            break;
          }
      return d;
    }
    function l(a, b) {
      var c,
        d,
        e,
        f,
        g = a.getElementsByTagName("source");
      for (c = 0, d = g.length; d > c; c++)
        (e = g[c]),
          (e[s.ns] = !0),
          (f = e.getAttribute("srcset")),
          f &&
            b.push({
              srcset: f,
              media: e.getAttribute("media"),
              type: e.getAttribute("type"),
              sizes: e.getAttribute("sizes"),
            });
    }
    function m(a, b) {
      function c(b) {
        var c,
          d = b.exec(a.substring(m));
        return d ? ((c = d[0]), (m += c.length), c) : void 0;
      }
      function e() {
        var a,
          c,
          d,
          e,
          f,
          i,
          j,
          k,
          l,
          m = !1,
          o = {};
        for (e = 0; e < h.length; e++)
          (f = h[e]),
            (i = f[f.length - 1]),
            (j = f.substring(0, f.length - 1)),
            (k = parseInt(j, 10)),
            (l = parseFloat(j)),
            W.test(j) && "w" === i
              ? ((a || c) && (m = !0), 0 === k ? (m = !0) : (a = k))
              : X.test(j) && "x" === i
              ? ((a || c || d) && (m = !0), 0 > l ? (m = !0) : (c = l))
              : W.test(j) && "h" === i
              ? ((d || c) && (m = !0), 0 === k ? (m = !0) : (d = k))
              : (m = !0);
        m ||
          ((o.url = g),
          a && (o.w = a),
          c && (o.d = c),
          d && (o.h = d),
          d || c || a || (o.d = 1),
          1 === o.d && (b.has1x = !0),
          (o.set = b),
          n.push(o));
      }
      function f() {
        for (c(S), i = "", j = "in descriptor"; ; ) {
          if (((k = a.charAt(m)), "in descriptor" === j))
            if (d(k)) i && (h.push(i), (i = ""), (j = "after descriptor"));
            else {
              if ("," === k) return (m += 1), i && h.push(i), void e();
              if ("(" === k) (i += k), (j = "in parens");
              else {
                if ("" === k) return i && h.push(i), void e();
                i += k;
              }
            }
          else if ("in parens" === j)
            if (")" === k) (i += k), (j = "in descriptor");
            else {
              if ("" === k) return h.push(i), void e();
              i += k;
            }
          else if ("after descriptor" === j)
            if (d(k));
            else {
              if ("" === k) return void e();
              (j = "in descriptor"), (m -= 1);
            }
          m += 1;
        }
      }
      for (var g, h, i, j, k, l = a.length, m = 0, n = []; ; ) {
        if ((c(T), m >= l)) return n;
        (g = c(U)),
          (h = []),
          "," === g.slice(-1) ? ((g = g.replace(V, "")), e()) : f();
      }
    }
    function n(a) {
      function b(a) {
        function b() {
          f && (g.push(f), (f = ""));
        }
        function c() {
          g[0] && (h.push(g), (g = []));
        }
        for (var e, f = "", g = [], h = [], i = 0, j = 0, k = !1; ; ) {
          if (((e = a.charAt(j)), "" === e)) return b(), c(), h;
          if (k) {
            if ("*" === e && "/" === a[j + 1]) {
              (k = !1), (j += 2), b();
              continue;
            }
            j += 1;
          } else {
            if (d(e)) {
              if ((a.charAt(j - 1) && d(a.charAt(j - 1))) || !f) {
                j += 1;
                continue;
              }
              if (0 === i) {
                b(), (j += 1);
                continue;
              }
              e = " ";
            } else if ("(" === e) i += 1;
            else if (")" === e) i -= 1;
            else {
              if ("," === e) {
                b(), c(), (j += 1);
                continue;
              }
              if ("/" === e && "*" === a.charAt(j + 1)) {
                (k = !0), (j += 2);
                continue;
              }
            }
            (f += e), (j += 1);
          }
        }
      }
      function c(a) {
        return k.test(a) && parseFloat(a) >= 0
          ? !0
          : l.test(a)
          ? !0
          : "0" === a || "-0" === a || "+0" === a
          ? !0
          : !1;
      }
      var e,
        f,
        g,
        h,
        i,
        j,
        k =
          /^(?:[+-]?[0-9]+|[0-9]*\.[0-9]+)(?:[eE][+-]?[0-9]+)?(?:ch|cm|em|ex|in|mm|pc|pt|px|rem|vh|vmin|vmax|vw)$/i,
        l = /^calc\((?:[0-9a-z \.\+\-\*\/\(\)]+)\)$/i;
      for (f = b(a), g = f.length, e = 0; g > e; e++)
        if (((h = f[e]), (i = h[h.length - 1]), c(i))) {
          if (((j = i), h.pop(), 0 === h.length)) return j;
          if (((h = h.join(" ")), s.matchesMedia(h))) return j;
        }
      return "100vw";
    }
    b.createElement("picture");
    var o,
      p,
      q,
      r,
      s = {},
      t = function () {},
      u = b.createElement("img"),
      v = u.getAttribute,
      w = u.setAttribute,
      x = u.removeAttribute,
      y = b.documentElement,
      z = {},
      A = { algorithm: "" },
      B = "data-pfsrc",
      C = B + "set",
      D = navigator.userAgent,
      E =
        /rident/.test(D) ||
        (/ecko/.test(D) && D.match(/rv\:(\d+)/) && RegExp.$1 > 35),
      F = "currentSrc",
      G = /\s+\+?\d+(e\d+)?w/,
      H = /(\([^)]+\))?\s*(.+)/,
      I = a.picturefillCFG,
      J =
        "position:absolute;left:0;visibility:hidden;display:block;padding:0;border:none;font-size:1em;width:1em;overflow:hidden;clip:rect(0px, 0px, 0px, 0px)",
      K = "font-size:100%!important;",
      L = !0,
      M = {},
      N = {},
      O = a.devicePixelRatio,
      P = { px: 1, in: 96 },
      Q = b.createElement("a"),
      R = !1,
      S = /^[ \t\n\r\u000c]+/,
      T = /^[, \t\n\r\u000c]+/,
      U = /^[^ \t\n\r\u000c]+/,
      V = /[,]+$/,
      W = /^\d+$/,
      X = /^-?(?:[0-9]+|[0-9]*\.[0-9]+)(?:[eE][+-]?[0-9]+)?$/,
      Y = function (a, b, c, d) {
        a.addEventListener
          ? a.addEventListener(b, c, d || !1)
          : a.attachEvent && a.attachEvent("on" + b, c);
      },
      Z = function (a) {
        var b = {};
        return function (c) {
          return c in b || (b[c] = a(c)), b[c];
        };
      },
      $ = (function () {
        var a = /^([\d\.]+)(em|vw|px)$/,
          b = function () {
            for (var a = arguments, b = 0, c = a[0]; ++b in a; )
              c = c.replace(a[b], a[++b]);
            return c;
          },
          c = Z(function (a) {
            return (
              "return " +
              b(
                (a || "").toLowerCase(),
                /\band\b/g,
                "&&",
                /,/g,
                "||",
                /min-([a-z-\s]+):/g,
                "e.$1>=",
                /max-([a-z-\s]+):/g,
                "e.$1<=",
                /calc([^)]+)/g,
                "($1)",
                /(\d+[\.]*[\d]*)([a-z]+)/g,
                "($1 * e.$2)",
                /^(?!(e.[a-z]|[0-9\.&=|><\+\-\*\(\)\/])).*/gi,
                ""
              ) +
              ";"
            );
          });
        return function (b, d) {
          var e;
          if (!(b in M))
            if (((M[b] = !1), d && (e = b.match(a)))) M[b] = e[1] * P[e[2]];
            else
              try {
                M[b] = new Function("e", c(b))(P);
              } catch (f) {}
          return M[b];
        };
      })(),
      _ = function (a, b) {
        return (
          a.w
            ? ((a.cWidth = s.calcListLength(b || "100vw")),
              (a.res = a.w / a.cWidth))
            : (a.res = a.d),
          a
        );
      },
      aa = function (a) {
        var c,
          d,
          e,
          f = a || {};
        if (
          (f.elements &&
            1 === f.elements.nodeType &&
            ("IMG" === f.elements.nodeName.toUpperCase()
              ? (f.elements = [f.elements])
              : ((f.context = f.elements), (f.elements = null))),
          (c =
            f.elements ||
            s.qsa(
              f.context || b,
              f.reevaluate || f.reselect ? s.sel : s.selShort
            )),
          (e = c.length))
        ) {
          for (s.setupRun(f), R = !0, d = 0; e > d; d++) s.fillImg(c[d], f);
          s.teardownRun(f);
        }
      };
    (o =
      a.console && console.warn
        ? function (a) {
            console.warn(a);
          }
        : t),
      F in u || (F = "src"),
      (z["image/jpeg"] = !0),
      (z["image/gif"] = !0),
      (z["image/png"] = !0),
      (z["image/svg+xml"] = b.implementation.hasFeature(
        "http://wwwindow.w3.org/TR/SVG11/feature#Image",
        "1.1"
      )),
      (s.ns = ("pf" + new Date().getTime()).substr(0, 9)),
      (s.supSrcset = "srcset" in u),
      (s.supSizes = "sizes" in u),
      (s.supPicture = !!a.HTMLPictureElement),
      s.supSrcset &&
        s.supPicture &&
        !s.supSizes &&
        !(function (a) {
          (u.srcset = "data:,a"),
            (a.src = "data:,a"),
            (s.supSrcset = u.complete === a.complete),
            (s.supPicture = s.supSrcset && s.supPicture);
        })(b.createElement("img")),
      (s.selShort = "picture>img,img[srcset]"),
      (s.sel = s.selShort),
      (s.cfg = A),
      s.supSrcset && (s.sel += ",img[" + C + "]"),
      (s.DPR = O || 1),
      (s.u = P),
      (s.types = z),
      (q = s.supSrcset && !s.supSizes),
      (s.setSize = t),
      (s.makeUrl = Z(function (a) {
        return (Q.href = a), Q.href;
      })),
      (s.qsa = function (a, b) {
        return a.querySelectorAll(b);
      }),
      (s.matchesMedia = function () {
        return (
          a.matchMedia && (matchMedia("(min-width: 0.1em)") || {}).matches
            ? (s.matchesMedia = function (a) {
                return !a || matchMedia(a).matches;
              })
            : (s.matchesMedia = s.mMQ),
          s.matchesMedia.apply(this, arguments)
        );
      }),
      (s.mMQ = function (a) {
        return a ? $(a) : !0;
      }),
      (s.calcLength = function (a) {
        var b = $(a, !0) || !1;
        return 0 > b && (b = !1), b;
      }),
      (s.supportsType = function (a) {
        return a ? z[a] : !0;
      }),
      (s.parseSize = Z(function (a) {
        var b = (a || "").match(H);
        return { media: b && b[1], length: b && b[2] };
      })),
      (s.parseSet = function (a) {
        return a.cands || (a.cands = m(a.srcset, a)), a.cands;
      }),
      (s.getEmValue = function () {
        var a;
        if (!p && (a = b.body)) {
          var c = b.createElement("div"),
            d = y.style.cssText,
            e = a.style.cssText;
          (c.style.cssText = J),
            (y.style.cssText = K),
            (a.style.cssText = K),
            a.appendChild(c),
            (p = c.offsetWidth),
            a.removeChild(c),
            (p = parseFloat(p, 10)),
            (y.style.cssText = d),
            (a.style.cssText = e);
        }
        return p || 16;
      }),
      (s.calcListLength = function (a) {
        if (!(a in N) || A.uT) {
          var b = s.calcLength(n(a));
          N[a] = b ? b : P.width;
        }
        return N[a];
      }),
      (s.setRes = function (a) {
        var b;
        if (a) {
          b = s.parseSet(a);
          for (var c = 0, d = b.length; d > c; c++) _(b[c], a.sizes);
        }
        return b;
      }),
      (s.setRes.res = _),
      (s.applySetCandidate = function (a, b) {
        if (a.length) {
          var c,
            d,
            e,
            f,
            h,
            k,
            l,
            m,
            n,
            o = b[s.ns],
            p = s.DPR;
          if (
            ((k = o.curSrc || b[F]),
            (l = o.curCan || j(b, k, a[0].set)),
            l &&
              l.set === a[0].set &&
              ((n = E && !b.complete && l.res - 0.1 > p),
              n || ((l.cached = !0), l.res >= p && (h = l))),
            !h)
          )
            for (a.sort(i), f = a.length, h = a[f - 1], d = 0; f > d; d++)
              if (((c = a[d]), c.res >= p)) {
                (e = d - 1),
                  (h =
                    a[e] &&
                    (n || k !== s.makeUrl(c.url)) &&
                    g(a[e].res, c.res, p, a[e].cached)
                      ? a[e]
                      : c);
                break;
              }
          h &&
            ((m = s.makeUrl(h.url)),
            (o.curSrc = m),
            (o.curCan = h),
            m !== k && s.setSrc(b, h),
            s.setSize(b));
        }
      }),
      (s.setSrc = function (a, b) {
        var c;
        (a.src = b.url),
          "image/svg+xml" === b.set.type &&
            ((c = a.style.width),
            (a.style.width = a.offsetWidth + 1 + "px"),
            a.offsetWidth + 1 && (a.style.width = c));
      }),
      (s.getSet = function (a) {
        var b,
          c,
          d,
          e = !1,
          f = a[s.ns].sets;
        for (b = 0; b < f.length && !e; b++)
          if (
            ((c = f[b]),
            c.srcset && s.matchesMedia(c.media) && (d = s.supportsType(c.type)))
          ) {
            "pending" === d && (c = d), (e = c);
            break;
          }
        return e;
      }),
      (s.parseSets = function (a, b, d) {
        var e,
          f,
          g,
          h,
          i = b && "PICTURE" === b.nodeName.toUpperCase(),
          j = a[s.ns];
        (j.src === c || d.src) &&
          ((j.src = v.call(a, "src")),
          j.src ? w.call(a, B, j.src) : x.call(a, B)),
          (j.srcset === c || d.srcset || !s.supSrcset || a.srcset) &&
            ((e = v.call(a, "srcset")), (j.srcset = e), (h = !0)),
          (j.sets = []),
          i && ((j.pic = !0), l(b, j.sets)),
          j.srcset
            ? ((f = { srcset: j.srcset, sizes: v.call(a, "sizes") }),
              j.sets.push(f),
              (g = (q || j.src) && G.test(j.srcset || "")),
              g ||
                !j.src ||
                k(j.src, f) ||
                f.has1x ||
                ((f.srcset += ", " + j.src),
                f.cands.push({ url: j.src, d: 1, set: f })))
            : j.src && j.sets.push({ srcset: j.src, sizes: null }),
          (j.curCan = null),
          (j.curSrc = c),
          (j.supported = !(i || (f && !s.supSrcset) || g)),
          h &&
            s.supSrcset &&
            !j.supported &&
            (e ? (w.call(a, C, e), (a.srcset = "")) : x.call(a, C)),
          j.supported &&
            !j.srcset &&
            ((!j.src && a.src) || a.src !== s.makeUrl(j.src)) &&
            (null === j.src ? a.removeAttribute("src") : (a.src = j.src)),
          (j.parsed = !0);
      }),
      (s.fillImg = function (a, b) {
        var c,
          d = b.reselect || b.reevaluate;
        a[s.ns] || (a[s.ns] = {}),
          (c = a[s.ns]),
          (d || c.evaled !== r) &&
            ((!c.parsed || b.reevaluate) && s.parseSets(a, a.parentNode, b),
            c.supported ? (c.evaled = r) : h(a));
      }),
      (s.setupRun = function () {
        (!R || L || O !== a.devicePixelRatio) && f();
      }),
      s.supPicture
        ? ((aa = t), (s.fillImg = t))
        : !(function () {
            var c,
              d = a.attachEvent ? /d$|^c/ : /d$|^c|^i/,
              e = function () {
                var a = b.readyState || "";
                (f = setTimeout(e, "loading" === a ? 200 : 999)),
                  b.body &&
                    (s.fillImgs(), (c = c || d.test(a)), c && clearTimeout(f));
              },
              f = setTimeout(e, b.body ? 9 : 99),
              g = function (a, b) {
                var c,
                  d,
                  e = function () {
                    var f = new Date() - d;
                    b > f ? (c = setTimeout(e, b - f)) : ((c = null), a());
                  };
                return function () {
                  (d = new Date()), c || (c = setTimeout(e, b));
                };
              },
              h = y.clientHeight,
              i = function () {
                (L =
                  Math.max(a.innerWidth || 0, y.clientWidth) !== P.width ||
                  y.clientHeight !== h),
                  (h = y.clientHeight),
                  L && s.fillImgs();
              };
            Y(a, "resize", g(i, 99)), Y(b, "readystatechange", e);
          })(),
      (s.picturefill = aa),
      (s.fillImgs = aa),
      (s.teardownRun = t),
      (aa._ = s),
      (a.picturefillCFG = {
        pf: s,
        push: function (a) {
          var b = a.shift();
          "function" == typeof s[b]
            ? s[b].apply(s, a)
            : ((A[b] = a[0]), R && s.fillImgs({ reselect: !0 }));
        },
      });
    for (; I && I.length; ) a.picturefillCFG.push(I.shift());
    (a.picturefill = aa),
      "object" == typeof module && "object" == typeof module.exports
        ? (module.exports = aa)
        : "function" == typeof define &&
          define.amd &&
          define("picturefill", function () {
            return aa;
          }),
      s.supPicture ||
        (z["image/webp"] = e(
          "image/webp",
          "data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAABBxAR/Q9ERP8DAABWUDggGAAAADABAJ0BKgEAAQADADQlpAADcAD++/1QAA=="
        ));
  })(window, document);
(function ($, $win) {
  "use strict";
  var ScrollDetector = (function () {
    var data = {};
    return {
      init: function () {
        var self = this;
        this.addHolder("win", $win);
        $win.on(
          "load.blockInViewport resize.blockInViewport orientationchange.blockInViewport",
          function () {
            $.each(data, function (holderKey, holderData) {
              self.calcHolderSize(holderData);
              $.each(holderData.items, function (itemKey, itemData) {
                self.calcItemSize(itemKey, itemData);
              });
            });
          }
        );
      },
      addHolder: function (holderKey, $holder) {
        var self = this;
        var holderData = {
          holder: $holder,
          items: {},
          props: { height: 0, scroll: 0 },
        };
        data[holderKey] = holderData;
        $holder.on("scroll.blockInViewport", function () {
          self.calcHolderScroll(holderData);
          $.each(holderData.items, function (itemKey, itemData) {
            self.calcItemScroll(itemKey, itemData);
          });
        });
        this.calcHolderSize(data[holderKey]);
      },
      calcHolderSize: function (holderData) {
        var holderOffset =
          window.self !== holderData.holder[0] ? holderData.holder.offset() : 0;
        holderData.props.height =
          holderData.holder.get(0) === window
            ? window.innerHeight || document.documentElement.clientHeight
            : holderData.holder.outerHeight();
        holderData.props.offset = holderOffset ? holderOffset.top : 0;
        this.calcHolderScroll(holderData);
      },
      calcItemSize: function (itemKey, itemData) {
        itemData.offset =
          itemData.$el.offset().top - itemData.holderProps.props.offset;
        itemData.height = itemData.$el.outerHeight();
        this.calcItemScroll(itemKey, itemData);
      },
      calcHolderScroll: function (holderData) {
        holderData.props.scroll = holderData.holder.scrollTop();
      },
      calcItemScroll: function (itemKey, itemData) {
        var itemInViewPortFromUp;
        var itemInViewPortFromDown;
        var itemOutViewPort;
        var holderProps = itemData.holderProps.props;
        switch (itemData.options.visibleMode) {
          case 1:
            itemInViewPortFromDown =
              itemData.offset < holderProps.scroll + holderProps.height / 2 ||
              itemData.offset + itemData.height <
                holderProps.scroll + holderProps.height;
            itemInViewPortFromUp =
              itemData.offset > holderProps.scroll ||
              itemData.offset + itemData.height >
                holderProps.scroll + holderProps.height / 2;
            break;
          case 2:
            itemInViewPortFromDown =
              itemInViewPortFromDown ||
              itemData.offset < holderProps.scroll + holderProps.height / 2 ||
              itemData.offset + itemData.height / 2 <
                holderProps.scroll + holderProps.height;
            itemInViewPortFromUp =
              itemInViewPortFromUp ||
              itemData.offset + itemData.height / 2 > holderProps.scroll ||
              itemData.offset + itemData.height >
                holderProps.scroll + holderProps.height / 2;
            break;
          case 3:
            itemInViewPortFromDown =
              itemInViewPortFromDown ||
              itemData.offset < holderProps.scroll + holderProps.height / 2 ||
              itemData.offset < holderProps.scroll + holderProps.height;
            itemInViewPortFromUp =
              itemInViewPortFromUp ||
              itemData.offset + itemData.height > holderProps.scroll ||
              itemData.offset + itemData.height >
                holderProps.scroll + holderProps.height / 2;
            break;
          default:
            itemInViewPortFromDown =
              itemInViewPortFromDown ||
              itemData.offset < holderProps.scroll + holderProps.height / 2 ||
              itemData.offset +
                Math.min(itemData.options.visibleMode, itemData.height) <
                holderProps.scroll + holderProps.height;
            itemInViewPortFromUp =
              itemInViewPortFromUp ||
              itemData.offset +
                itemData.height -
                Math.min(itemData.options.visibleMode, itemData.height) >
                holderProps.scroll ||
              itemData.offset + itemData.height >
                holderProps.scroll + holderProps.height / 2;
            break;
        }
        if (itemInViewPortFromUp && itemInViewPortFromDown) {
          if (!itemData.state) {
            itemData.state = true;
            itemData.$el
              .addClass(itemData.options.activeClass)
              .trigger("in-viewport", true);
            if (
              itemData.options.once ||
              ($.isFunction(itemData.options.onShow) &&
                itemData.options.onShow(itemData))
            ) {
              delete itemData.holderProps.items[itemKey];
            }
          }
        } else {
          itemOutViewPort =
            itemData.offset < holderProps.scroll + holderProps.height &&
            itemData.offset + itemData.height > holderProps.scroll;
          if ((itemData.state || isNaN(itemData.state)) && !itemOutViewPort) {
            itemData.state = false;
            itemData.$el
              .removeClass(itemData.options.activeClass)
              .trigger("in-viewport", false);
          }
        }
      },
      addItem: function (el, options) {
        var itemKey = "item" + this.getRandomValue();
        var newItem = { $el: $(el), options: options };
        var holderKeyDataName = "in-viewport-holder";
        var $holder = newItem.$el.closest(options.holder);
        var holderKey = $holder.data(holderKeyDataName);
        if (!$holder.length) {
          holderKey = "win";
        } else if (!holderKey) {
          holderKey = "holder" + this.getRandomValue();
          $holder.data(holderKeyDataName, holderKey);
          this.addHolder(holderKey, $holder);
        }
        newItem.holderProps = data[holderKey];
        data[holderKey].items[itemKey] = newItem;
        this.calcItemSize(itemKey, newItem);
      },
      getRandomValue: function () {
        return (Math.random() * 100000).toFixed(0);
      },
      destroy: function () {
        $win.off(".blockInViewport");
        $.each(data, function (key, value) {
          value.holder.off(".blockInViewport");
          $.each(value.items, function (key, value) {
            value.$el.removeClass(value.options.activeClass);
            value.$el.get(0).itemInViewportAdded = null;
          });
        });
        data = {};
      },
    };
  })();
  ScrollDetector.init();
  $.fn.itemInViewport = function (options) {
    options = $.extend(
      { activeClass: "in-viewport", once: true, holder: "", visibleMode: 1 },
      options
    );
    return this.each(function () {
      if (this.itemInViewportAdded) {
        return;
      }
      this.itemInViewportAdded = true;
      ScrollDetector.addItem(this, options);
    });
  };
})(jQuery, jQuery(window));
/*!
 * JavaScript Custom Forms
 *
 * Copyright 2014-2015 PSD2HTML - http://psd2html.com/jcf
 * Released under the MIT license (LICENSE.txt)
 *
 * Version: 1.1.3
 */
(function (root, factory) {
  "use strict";
  if (typeof define === "function" && define.amd) {
    define(["jquery"], factory);
  } else if (typeof exports === "object") {
    module.exports = factory(require("jquery"));
  } else {
    root.jcf = factory(jQuery);
  }
})(this, function ($) {
  "use strict";
  var version = "1.1.3";
  var customInstances = [];
  var commonOptions = {
    optionsKey: "jcf",
    dataKey: "jcf-instance",
    rtlClass: "jcf-rtl",
    focusClass: "jcf-focus",
    pressedClass: "jcf-pressed",
    disabledClass: "jcf-disabled",
    hiddenClass: "jcf-hidden",
    resetAppearanceClass: "jcf-reset-appearance",
    unselectableClass: "jcf-unselectable",
  };
  var isTouchDevice =
      "ontouchstart" in window ||
      (window.DocumentTouch && document instanceof window.DocumentTouch),
    isWinPhoneDevice = /Windows Phone/.test(navigator.userAgent);
  commonOptions.isMobileDevice = !!(isTouchDevice || isWinPhoneDevice);
  var isIOS = /(iPad|iPhone).*OS ([0-9_]*) .*/.exec(navigator.userAgent);
  if (isIOS) isIOS = parseFloat(isIOS[2].replace(/_/g, "."));
  commonOptions.ios = isIOS;
  var createStyleSheet = function () {
    var styleTag = $("<style>").appendTo("head"),
      styleSheet = styleTag.prop("sheet") || styleTag.prop("styleSheet");
    var addCSSRule = function (selector, rules, index) {
      if (styleSheet.insertRule) {
        styleSheet.insertRule(selector + "{" + rules + "}", index);
      } else {
        styleSheet.addRule(selector, rules, index);
      }
    };
    addCSSRule(
      "." + commonOptions.hiddenClass,
      "position:absolute !important;left:-9999px !important;height:1px !important;width:1px !important;margin:0 !important;border-width:0 !important;-webkit-appearance:none;-moz-appearance:none;appearance:none"
    );
    addCSSRule(
      "." + commonOptions.rtlClass + " ." + commonOptions.hiddenClass,
      "right:-9999px !important; left: auto !important"
    );
    addCSSRule(
      "." + commonOptions.unselectableClass,
      "-webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; -webkit-tap-highlight-color: rgba(0,0,0,0);"
    );
    addCSSRule(
      "." + commonOptions.resetAppearanceClass,
      "background: none; border: none; -webkit-appearance: none; appearance: none; opacity: 0; filter: alpha(opacity=0);"
    );
    var html = $("html"),
      body = $("body");
    if (html.css("direction") === "rtl" || body.css("direction") === "rtl") {
      html.addClass(commonOptions.rtlClass);
    }
    html.on("reset", function () {
      setTimeout(function () {
        api.refreshAll();
      }, 0);
    });
    commonOptions.styleSheetCreated = true;
  };
  (function () {
    var pointerEventsSupported =
        navigator.pointerEnabled || navigator.msPointerEnabled,
      touchEventsSupported =
        "ontouchstart" in window ||
        (window.DocumentTouch && document instanceof window.DocumentTouch),
      eventList,
      eventMap = {},
      eventPrefix = "jcf-";
    if (pointerEventsSupported) {
      eventList = {
        pointerover: navigator.pointerEnabled ? "pointerover" : "MSPointerOver",
        pointerdown: navigator.pointerEnabled ? "pointerdown" : "MSPointerDown",
        pointermove: navigator.pointerEnabled ? "pointermove" : "MSPointerMove",
        pointerup: navigator.pointerEnabled ? "pointerup" : "MSPointerUp",
      };
    } else {
      eventList = {
        pointerover: "mouseover",
        pointerdown: "mousedown" + (touchEventsSupported ? " touchstart" : ""),
        pointermove: "mousemove" + (touchEventsSupported ? " touchmove" : ""),
        pointerup: "mouseup" + (touchEventsSupported ? " touchend" : ""),
      };
    }
    $.each(eventList, function (targetEventName, fakeEventList) {
      $.each(fakeEventList.split(" "), function (index, fakeEventName) {
        eventMap[fakeEventName] = targetEventName;
      });
    });
    $.each(eventList, function (eventName, eventHandlers) {
      eventHandlers = eventHandlers.split(" ");
      $.event.special[eventPrefix + eventName] = {
        setup: function () {
          var self = this;
          $.each(eventHandlers, function (index, fallbackEvent) {
            if (self.addEventListener)
              self.addEventListener(fallbackEvent, fixEvent, false);
            else self["on" + fallbackEvent] = fixEvent;
          });
        },
        teardown: function () {
          var self = this;
          $.each(eventHandlers, function (index, fallbackEvent) {
            if (self.addEventListener)
              self.removeEventListener(fallbackEvent, fixEvent, false);
            else self["on" + fallbackEvent] = null;
          });
        },
      };
    });
    var lastTouch = null;
    var mouseEventSimulated = function (e) {
      var dx = Math.abs(e.pageX - lastTouch.x),
        dy = Math.abs(e.pageY - lastTouch.y),
        rangeDistance = 25;
      if (dx <= rangeDistance && dy <= rangeDistance) {
        return true;
      }
    };
    var fixEvent = function (e) {
      var origEvent = e || window.event,
        touchEventData = null,
        targetEventName = eventMap[origEvent.type];
      e = $.event.fix(origEvent);
      e.type = eventPrefix + targetEventName;
      if (origEvent.pointerType) {
        switch (origEvent.pointerType) {
          case 2:
            e.pointerType = "touch";
            break;
          case 3:
            e.pointerType = "pen";
            break;
          case 4:
            e.pointerType = "mouse";
            break;
          default:
            e.pointerType = origEvent.pointerType;
        }
      } else {
        e.pointerType = origEvent.type.substr(0, 5);
      }
      if (!e.pageX && !e.pageY) {
        touchEventData = origEvent.changedTouches
          ? origEvent.changedTouches[0]
          : origEvent;
        e.pageX = touchEventData.pageX;
        e.pageY = touchEventData.pageY;
      }
      if (origEvent.type === "touchend") {
        lastTouch = { x: e.pageX, y: e.pageY };
      }
      if (e.pointerType === "mouse" && lastTouch && mouseEventSimulated(e)) {
        return;
      } else {
        return ($.event.dispatch || $.event.handle).call(this, e);
      }
    };
  })();
  (function () {
    var wheelEvents = (
        "onwheel" in document || document.documentMode >= 9
          ? "wheel"
          : "mousewheel DOMMouseScroll"
      ).split(" "),
      shimEventName = "jcf-mousewheel";
    $.event.special[shimEventName] = {
      setup: function () {
        var self = this;
        $.each(wheelEvents, function (index, fallbackEvent) {
          if (self.addEventListener)
            self.addEventListener(fallbackEvent, fixEvent, false);
          else self["on" + fallbackEvent] = fixEvent;
        });
      },
      teardown: function () {
        var self = this;
        $.each(wheelEvents, function (index, fallbackEvent) {
          if (self.addEventListener)
            self.removeEventListener(fallbackEvent, fixEvent, false);
          else self["on" + fallbackEvent] = null;
        });
      },
    };
    var fixEvent = function (e) {
      var origEvent = e || window.event;
      e = $.event.fix(origEvent);
      e.type = shimEventName;
      if ("detail" in origEvent) {
        e.deltaY = -origEvent.detail;
      }
      if ("wheelDelta" in origEvent) {
        e.deltaY = -origEvent.wheelDelta;
      }
      if ("wheelDeltaY" in origEvent) {
        e.deltaY = -origEvent.wheelDeltaY;
      }
      if ("wheelDeltaX" in origEvent) {
        e.deltaX = -origEvent.wheelDeltaX;
      }
      if ("deltaY" in origEvent) {
        e.deltaY = origEvent.deltaY;
      }
      if ("deltaX" in origEvent) {
        e.deltaX = origEvent.deltaX;
      }
      e.delta = e.deltaY || e.deltaX;
      if (origEvent.deltaMode === 1) {
        var lineHeight = 16;
        e.delta *= lineHeight;
        e.deltaY *= lineHeight;
        e.deltaX *= lineHeight;
      }
      return ($.event.dispatch || $.event.handle).call(this, e);
    };
  })();
  var moduleMixin = {
    fireNativeEvent: function (elements, eventName) {
      $(elements).each(function () {
        var element = this,
          eventObject;
        if (element.dispatchEvent) {
          eventObject = document.createEvent("HTMLEvents");
          eventObject.initEvent(eventName, true, true);
          element.dispatchEvent(eventObject);
        } else if (document.createEventObject) {
          eventObject = document.createEventObject();
          eventObject.target = element;
          element.fireEvent("on" + eventName, eventObject);
        }
      });
    },
    bindHandlers: function () {
      var self = this;
      $.each(self, function (propName, propValue) {
        if (propName.indexOf("on") === 0 && $.isFunction(propValue)) {
          self[propName] = function () {
            return propValue.apply(self, arguments);
          };
        }
      });
    },
  };
  var api = {
    version: version,
    modules: {},
    getOptions: function () {
      return $.extend({}, commonOptions);
    },
    setOptions: function (moduleName, moduleOptions) {
      if (arguments.length > 1) {
        if (this.modules[moduleName]) {
          $.extend(this.modules[moduleName].prototype.options, moduleOptions);
        }
      } else {
        $.extend(commonOptions, moduleName);
      }
    },
    addModule: function (proto) {
      var Module = function (options) {
        if (!options.element.data(commonOptions.dataKey)) {
          options.element.data(commonOptions.dataKey, this);
        }
        customInstances.push(this);
        this.options = $.extend(
          {},
          commonOptions,
          this.options,
          getInlineOptions(options.element),
          options
        );
        this.bindHandlers();
        this.init.apply(this, arguments);
      };
      var getInlineOptions = function (element) {
        var dataOptions = element.data(commonOptions.optionsKey),
          attrOptions = element.attr(commonOptions.optionsKey);
        if (dataOptions) {
          return dataOptions;
        } else if (attrOptions) {
          try {
            return $.parseJSON(attrOptions);
          } catch (e) {}
        }
      };
      Module.prototype = proto;
      $.extend(proto, moduleMixin);
      if (proto.plugins) {
        $.each(proto.plugins, function (pluginName, plugin) {
          $.extend(plugin.prototype, moduleMixin);
        });
      }
      var originalDestroy = Module.prototype.destroy;
      Module.prototype.destroy = function () {
        this.options.element.removeData(this.options.dataKey);
        for (var i = customInstances.length - 1; i >= 0; i--) {
          if (customInstances[i] === this) {
            customInstances.splice(i, 1);
            break;
          }
        }
        if (originalDestroy) {
          originalDestroy.apply(this, arguments);
        }
      };
      this.modules[proto.name] = Module;
    },
    getInstance: function (element) {
      return $(element).data(commonOptions.dataKey);
    },
    replace: function (elements, moduleName, customOptions) {
      var self = this,
        instance;
      if (!commonOptions.styleSheetCreated) {
        createStyleSheet();
      }
      $(elements).each(function () {
        var moduleOptions,
          element = $(this);
        instance = element.data(commonOptions.dataKey);
        if (instance) {
          instance.refresh();
        } else {
          if (!moduleName) {
            $.each(self.modules, function (currentModuleName, module) {
              if (
                module.prototype.matchElement.call(module.prototype, element)
              ) {
                moduleName = currentModuleName;
                return false;
              }
            });
          }
          if (moduleName) {
            moduleOptions = $.extend({ element: element }, customOptions);
            instance = new self.modules[moduleName](moduleOptions);
          }
        }
      });
      return instance;
    },
    refresh: function (elements) {
      $(elements).each(function () {
        var instance = $(this).data(commonOptions.dataKey);
        if (instance) {
          instance.refresh();
        }
      });
    },
    destroy: function (elements) {
      $(elements).each(function () {
        var instance = $(this).data(commonOptions.dataKey);
        if (instance) {
          instance.destroy();
        }
      });
    },
    replaceAll: function (context) {
      var self = this;
      $.each(this.modules, function (moduleName, module) {
        $(module.prototype.selector, context).each(function () {
          if (this.className.indexOf("jcf-ignore") < 0) {
            self.replace(this, moduleName);
          }
        });
      });
    },
    refreshAll: function (context) {
      if (context) {
        $.each(this.modules, function (moduleName, module) {
          $(module.prototype.selector, context).each(function () {
            var instance = $(this).data(commonOptions.dataKey);
            if (instance) {
              instance.refresh();
            }
          });
        });
      } else {
        for (var i = customInstances.length - 1; i >= 0; i--) {
          customInstances[i].refresh();
        }
      }
    },
    destroyAll: function (context) {
      if (context) {
        $.each(this.modules, function (moduleName, module) {
          $(module.prototype.selector, context).each(function (index, element) {
            var instance = $(element).data(commonOptions.dataKey);
            if (instance) {
              instance.destroy();
            }
          });
        });
      } else {
        while (customInstances.length) {
          customInstances[0].destroy();
        }
      }
    },
  };
  window.jcf = api;
  return api;
});
/*!
 * JavaScript Custom Forms : Range Module
 *
 * Copyright 2014-2015 PSD2HTML - http://psd2html.com/jcf
 * Released under the MIT license (LICENSE.txt)
 *
 * Version: 1.1.3
 */
(function ($) {
  "use strict";
  jcf.addModule({
    name: "Range",
    selector: 'input[type="range"]',
    options: {
      realElementClass: "jcf-real-element",
      fakeStructure:
        '<span class="jcf-range"><span class="jcf-range-wrapper"><span class="jcf-range-progress"></span><span class="jcf-range-track"><span class="jcf-range-handle"></span></span></span></span>',
      dataListMark: '<span class="jcf-range-mark"></span>',
      rangeDisplayWrapper: '<span class="jcf-range-display-wrapper"></span>',
      rangeDisplay: '<span class="jcf-range-display"></span>',
      handleSelector: ".jcf-range-handle",
      trackSelector: ".jcf-range-track",
      activeHandleClass: "jcf-active-handle",
      verticalClass: "jcf-vertical",
      orientation: "horizontal",
      range: false,
      dragHandleCenter: true,
      snapToMarks: true,
      snapRadius: 5,
    },
    matchElement: function (element) {
      return element.is(this.selector);
    },
    init: function () {
      this.initStructure();
      this.attachEvents();
      this.refresh();
    },
    initStructure: function () {
      this.page = $("html");
      this.realElement = $(this.options.element).addClass(
        this.options.hiddenClass
      );
      this.fakeElement = $(this.options.fakeStructure)
        .insertBefore(this.realElement)
        .prepend(this.realElement);
      this.track = this.fakeElement.find(this.options.trackSelector);
      this.trackHolder = this.track.parent();
      this.handle = this.fakeElement.find(this.options.handleSelector);
      this.createdHandleCount = 0;
      this.activeDragHandleIndex = 0;
      this.isMultiple =
        this.realElement.prop("multiple") ||
        typeof this.realElement.attr("multiple") === "string";
      this.values = this.isMultiple
        ? this.realElement.attr("value").split(",")
        : [this.realElement.val()];
      this.handleCount = this.isMultiple ? this.values.length : 1;
      this.rangeDisplayWrapper = $(
        this.options.rangeDisplayWrapper
      ).insertBefore(this.track);
      if (this.options.range === "min" || this.options.range === "all") {
        this.rangeMin = $(this.options.rangeDisplay)
          .addClass("jcf-range-min")
          .prependTo(this.rangeDisplayWrapper);
      }
      if (this.options.range === "max" || this.options.range === "all") {
        this.rangeMax = $(this.options.rangeDisplay)
          .addClass("jcf-range-max")
          .prependTo(this.rangeDisplayWrapper);
      }
      while (this.createdHandleCount < this.handleCount) {
        this.createdHandleCount++;
        this.handle
          .clone()
          .addClass("jcf-index-" + this.createdHandleCount)
          .insertBefore(this.handle);
        if (this.createdHandleCount > 1) {
          if (!this.rangeMid) {
            this.rangeMid = $();
          }
          this.rangeMid = this.rangeMid.add(
            $(this.options.rangeDisplay)
              .addClass("jcf-range-mid")
              .prependTo(this.rangeDisplayWrapper)
          );
        }
      }
      this.handle.detach();
      this.handle = null;
      this.handles = this.fakeElement.find(this.options.handleSelector);
      this.handles.append(
        '<span class="jcf-range-tooltip"><span class="jcf-range-value">' +
          this.realElement.val()
      );
      this.fakeLabel = this.handles.find(".jcf-range-tooltip");
      this.fakeLabelValue = this.handles.find(".jcf-range-value");
      this.handles.eq(0).addClass(this.options.activeHandleClass);
      this.isVertical = this.options.orientation === "vertical";
      this.directionProperty = this.isVertical ? "top" : "left";
      this.offsetProperty = this.isVertical ? "bottom" : "left";
      this.eventProperty = this.isVertical ? "pageY" : "pageX";
      this.sizeProperty = this.isVertical ? "height" : "width";
      this.sizeMethod = this.isVertical ? "innerHeight" : "innerWidth";
      this.fakeElement.css("touchAction", this.isVertical ? "pan-x" : "pan-y");
      if (this.isVertical) {
        this.fakeElement.addClass(this.options.verticalClass);
      }
      this.minValue = parseFloat(this.realElement.attr("min"));
      this.maxValue = parseFloat(this.realElement.attr("max"));
      this.stepValue = parseFloat(this.realElement.attr("step")) || 1;
      this.minValue = isNaN(this.minValue) ? 0 : this.minValue;
      this.maxValue = isNaN(this.maxValue) ? 100 : this.maxValue;
      if (this.stepValue !== 1) {
        this.maxValue -= (this.maxValue - this.minValue) % this.stepValue;
      }
      this.stepsCount = (this.maxValue - this.minValue) / this.stepValue;
      this.createDataList();
    },
    attachEvents: function () {
      this.realElement.on({ focus: this.onFocus });
      this.trackHolder.on("jcf-pointerdown", this.onTrackPress);
      this.handles.on("jcf-pointerdown", this.onHandlePress);
    },
    createDataList: function () {
      var self = this,
        dataValues = [],
        dataListId = this.realElement.attr("list");
      if (dataListId) {
        $("#" + dataListId)
          .find("option")
          .each(function () {
            var itemValue = parseFloat(this.value || this.innerHTML),
              mark,
              markOffset;
            if (!isNaN(itemValue)) {
              markOffset = self.valueToOffset(itemValue);
              dataValues.push({ value: itemValue, offset: markOffset });
              mark = $(self.options.dataListMark)
                .text(itemValue)
                .attr({ "data-mark-value": itemValue })
                .css(self.offsetProperty, markOffset + "%")
                .appendTo(self.track);
            }
          });
        if (dataValues.length) {
          self.dataValues = dataValues;
        }
      }
    },
    getDragHandleRange: function (handleIndex) {
      var minStep = -Infinity,
        maxStep = Infinity;
      if (handleIndex > 0) {
        minStep = this.valueToStepIndex(this.values[handleIndex - 1]);
      }
      if (handleIndex < this.handleCount - 1) {
        maxStep = this.valueToStepIndex(this.values[handleIndex + 1]);
      }
      return { minStepIndex: minStep, maxStepIndex: maxStep };
    },
    getNearestHandle: function (percent) {
      if (this.isVertical) {
        percent = 1 - percent;
      }
      var closestHandle = this.handles.eq(0),
        closestDistance = Infinity,
        self = this;
      if (this.handleCount > 1) {
        this.handles.each(function () {
          var handleOffset = parseFloat(this.style[self.offsetProperty]) / 100,
            handleDistance = Math.abs(handleOffset - percent);
          if (handleDistance < closestDistance) {
            closestDistance = handleDistance;
            closestHandle = $(this);
          }
        });
      }
      return closestHandle;
    },
    onTrackPress: function (e) {
      var trackSize, trackOffset, innerOffset;
      e.preventDefault();
      if (!this.realElement.is(":disabled") && !this.activeDragHandle) {
        trackSize = this.track[this.sizeMethod]();
        trackOffset = this.track.offset()[this.directionProperty];
        this.activeDragHandle = this.getNearestHandle(
          (e[this.eventProperty] - trackOffset) /
            this.trackHolder[this.sizeMethod]()
        );
        this.activeDragHandleIndex = this.handles.index(this.activeDragHandle);
        this.handles
          .removeClass(this.options.activeHandleClass)
          .eq(this.activeDragHandleIndex)
          .addClass(this.options.activeHandleClass);
        innerOffset = this.activeDragHandle[this.sizeMethod]() / 2;
        this.dragData = {
          trackSize: trackSize,
          innerOffset: innerOffset,
          trackOffset: trackOffset,
          min: trackOffset,
          max: trackOffset + trackSize,
        };
        this.page.on({
          "jcf-pointermove": this.onHandleMove,
          "jcf-pointerup": this.onHandleRelease,
        });
        if (e.pointerType === "mouse") {
          this.realElement.focus();
        }
        this.onHandleMove(e);
      }
    },
    onHandlePress: function (e) {
      var trackSize, trackOffset, innerOffset;
      e.preventDefault();
      if (!this.realElement.is(":disabled") && !this.activeDragHandle) {
        this.activeDragHandle = $(e.currentTarget);
        this.activeDragHandleIndex = this.handles.index(this.activeDragHandle);
        this.handles
          .removeClass(this.options.activeHandleClass)
          .eq(this.activeDragHandleIndex)
          .addClass(this.options.activeHandleClass);
        trackSize = this.track[this.sizeMethod]();
        trackOffset = this.track.offset()[this.directionProperty];
        innerOffset = this.options.dragHandleCenter
          ? this.activeDragHandle[this.sizeMethod]() / 2
          : e[this.eventProperty] -
            this.handle.offset()[this.directionProperty];
        this.dragData = {
          trackSize: trackSize,
          innerOffset: innerOffset,
          trackOffset: trackOffset,
          min: trackOffset,
          max: trackOffset + trackSize,
        };
        this.page.on({
          "jcf-pointermove": this.onHandleMove,
          "jcf-pointerup": this.onHandleRelease,
        });
        if (e.pointerType === "mouse") {
          this.realElement.focus();
        }
      }
    },
    onHandleMove: function (e) {
      var self = this,
        newOffset,
        dragPercent,
        stepIndex,
        valuePercent,
        handleDragRange;
      if (this.isVertical) {
        newOffset =
          this.dragData.max +
          (this.dragData.min - e[this.eventProperty]) -
          this.dragData.innerOffset;
      } else {
        newOffset = e[this.eventProperty] - this.dragData.innerOffset;
      }
      if (newOffset < this.dragData.min) {
        newOffset = this.dragData.min;
      } else if (newOffset > this.dragData.max) {
        newOffset = this.dragData.max;
      }
      e.preventDefault();
      if (this.options.snapToMarks && this.dataValues) {
        var dragOffset = newOffset - this.dragData.trackOffset;
        dragPercent =
          ((newOffset - this.dragData.trackOffset) / this.dragData.trackSize) *
          100;
        $.each(this.dataValues, function (index, item) {
          var markOffset = (item.offset / 100) * self.dragData.trackSize,
            markMin = markOffset - self.options.snapRadius,
            markMax = markOffset + self.options.snapRadius;
          if (dragOffset >= markMin && dragOffset <= markMax) {
            dragPercent = item.offset;
            return false;
          }
        });
      } else {
        dragPercent =
          ((newOffset - this.dragData.trackOffset) / this.dragData.trackSize) *
          100;
      }
      stepIndex = Math.round((dragPercent * this.stepsCount) / 100);
      if (this.handleCount > 1) {
        handleDragRange = this.getDragHandleRange(this.activeDragHandleIndex);
        if (stepIndex < handleDragRange.minStepIndex) {
          stepIndex = Math.max(handleDragRange.minStepIndex, stepIndex);
        } else if (stepIndex > handleDragRange.maxStepIndex) {
          stepIndex = Math.min(handleDragRange.maxStepIndex, stepIndex);
        }
      }
      valuePercent = stepIndex * (100 / this.stepsCount);
      if (this.dragData.stepIndex !== stepIndex) {
        this.dragData.stepIndex = stepIndex;
        this.dragData.offset = valuePercent;
        this.activeDragHandle.css(
          this.offsetProperty,
          this.dragData.offset + "%"
        );
        this.values[this.activeDragHandleIndex] =
          "" + this.stepIndexToValue(stepIndex);
        this.updateValues();
        this.realElement.trigger("input");
      }
    },
    onHandleRelease: function () {
      var newValue;
      if (typeof this.dragData.offset === "number") {
        newValue = this.stepIndexToValue(this.dragData.stepIndex);
        this.realElement.val(newValue).trigger("change");
      }
      this.page.off({
        "jcf-pointermove": this.onHandleMove,
        "jcf-pointerup": this.onHandleRelease,
      });
      delete this.activeDragHandle;
      delete this.dragData;
    },
    onFocus: function () {
      if (!this.fakeElement.hasClass(this.options.focusClass)) {
        this.fakeElement.addClass(this.options.focusClass);
        this.realElement.on({ blur: this.onBlur, keydown: this.onKeyPress });
      }
    },
    onBlur: function () {
      this.fakeElement.removeClass(this.options.focusClass);
      this.realElement.off({ blur: this.onBlur, keydown: this.onKeyPress });
    },
    onKeyPress: function (e) {
      var incValue = e.which === 38 || e.which === 39,
        decValue = e.which === 37 || e.which === 40;
      if (e.which === 9 && this.handleCount > 1) {
        if (e.shiftKey && this.activeDragHandleIndex > 0) {
          this.activeDragHandleIndex--;
        } else if (
          !e.shiftKey &&
          this.activeDragHandleIndex < this.handleCount - 1
        ) {
          this.activeDragHandleIndex++;
        } else {
          return;
        }
        e.preventDefault();
        this.handles
          .removeClass(this.options.activeHandleClass)
          .eq(this.activeDragHandleIndex)
          .addClass(this.options.activeHandleClass);
      }
      if (decValue || incValue) {
        e.preventDefault();
        this.step(incValue ? this.stepValue : -this.stepValue);
      }
    },
    updateValues: function () {
      var value = this.values.join(",");
      if (this.values.length > 1) {
        this.realElement.prop("valueLow", this.values[0]);
        this.realElement.prop("valueHigh", this.values[this.values.length - 1]);
        this.realElement.val(value);
        if (this.realElement.val() !== value) {
          this.realElement.val(this.values[this.values.length - 1]);
        }
      } else {
        this.realElement.val(value);
      }
      if (value >= this.maxValue / 2) {
        this.fakeLabel.addClass("jcf-range-tooltip-right");
      } else {
        this.fakeLabel.removeClass("jcf-range-tooltip-right");
      }
      this.trackHolder
        .find(".jcf-range-progress")
        .css("width", this.valueToOffset(this.values[0]) + "%");
      this.fakeLabel.find(".jcf-range-value").text(value);
      jQuery("[data-value]").text(value);
      this.updateRanges();
    },
    updateRanges: function () {
      var self = this,
        handle;
      if (this.rangeMin) {
        handle = this.handles[0];
        this.rangeMin
          .css(this.offsetProperty, 0)
          .css(this.sizeProperty, handle.style[this.offsetProperty]);
      }
      if (this.rangeMax) {
        handle = this.handles[this.handles.length - 1];
        this.rangeMax
          .css(this.offsetProperty, handle.style[this.offsetProperty])
          .css(
            this.sizeProperty,
            100 - parseFloat(handle.style[this.offsetProperty]) + "%"
          );
      }
      if (this.rangeMid) {
        this.handles.each(function (index, curHandle) {
          var prevHandle, midBox;
          if (index > 0) {
            prevHandle = self.handles[index - 1];
            midBox = self.rangeMid[index - 1];
            midBox.style[self.offsetProperty] =
              prevHandle.style[self.offsetProperty];
            midBox.style[self.sizeProperty] =
              parseFloat(curHandle.style[self.offsetProperty]) -
              parseFloat(prevHandle.style[self.offsetProperty]) +
              "%";
          }
        });
      }
    },
    step: function (changeValue) {
      var originalValue = parseFloat(
          this.values[this.activeDragHandleIndex || 0]
        ),
        newValue = originalValue,
        minValue = this.minValue,
        maxValue = this.maxValue;
      if (isNaN(originalValue)) {
        newValue = 0;
      }
      newValue += changeValue;
      if (this.handleCount > 1) {
        if (this.activeDragHandleIndex > 0) {
          minValue = parseFloat(this.values[this.activeDragHandleIndex - 1]);
        }
        if (this.activeDragHandleIndex < this.handleCount - 1) {
          maxValue = parseFloat(this.values[this.activeDragHandleIndex + 1]);
        }
      }
      if (newValue > maxValue) {
        newValue = maxValue;
      } else if (newValue < minValue) {
        newValue = minValue;
      }
      if (newValue !== originalValue) {
        this.values[this.activeDragHandleIndex || 0] = "" + newValue;
        this.updateValues();
        this.realElement.trigger("input").trigger("change");
        this.setSliderValue(this.values);
      }
    },
    valueToStepIndex: function (value) {
      return (value - this.minValue) / this.stepValue;
    },
    stepIndexToValue: function (stepIndex) {
      return this.minValue + this.stepValue * stepIndex;
    },
    valueToOffset: function (value) {
      var range = this.maxValue - this.minValue,
        percent = (value - this.minValue) / range;
      return percent * 100;
    },
    getSliderValue: function () {
      return $.map(this.values, function (value) {
        return parseFloat(value) || 0;
      });
    },
    setSliderValue: function (values) {
      var self = this;
      this.handles.each(function (index, handle) {
        handle.style[self.offsetProperty] =
          self.valueToOffset(values[index]) + "%";
      });
    },
    refresh: function () {
      var isDisabled = this.realElement.is(":disabled");
      this.fakeElement.toggleClass(this.options.disabledClass, isDisabled);
      this.setSliderValue(this.getSliderValue());
      this.updateValues();
    },
    destroy: function () {
      this.realElement
        .removeClass(this.options.hiddenClass)
        .insertBefore(this.fakeElement);
      this.fakeElement.remove();
      this.realElement.off({
        keydown: this.onKeyPress,
        focus: this.onFocus,
        blur: this.onBlur,
      });
    },
  });
})(jQuery);
