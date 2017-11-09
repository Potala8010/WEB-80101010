(function() {
    var t, e, i, n, s, r, o = true;
    a();
    _();
    l();
    function a() {
        t = jQuery("#banner").width();
        e = jQuery("#banner").height();
        r = {
            x: t / 2,
            y: e / 2
        };
        i = document.getElementById("animate-net");
        i.width = t;
        i.height = e;
        n = i.getContext("2d");
        s = [];
        for (var o = 0; o < t - t / 10; o = o + t / 10) {
            for (var a = 0; a < e - e / 10; a = a + e / 10) {
                var l = o + Math.random() * t / 10;
                var h = a + Math.random() * e / 10;
                var u = {
                    x: l,
                    originX: l,
                    y: h,
                    originY: h
                };
                s.push(u)
            }
        }
        for (var _ = 0; _ < s.length; _++) {
            var c = [];
            var f = s[_];
            for (var p = 0; p < s.length; p++) {
                var v = s[p];
                if (!(f == v)) {
                    var g = false;
                    for (var w = 0; w < 5; w++) {
                        if (!g) {
                            if (c[w] == undefined) {
                                c[w] = v;
                                g = true
                            }
                        }
                    }
                    for (var w = 0; w < 5; w++) {
                        if (!g) {
                            if (m(f, v) < m(f, c[w])) {
                                c[w] = v;
                                g = true
                            }
                        }
                    }
                }
            }
            f.closest = c
        }
        for (var _ in s) {
            var y = new d(s[_], 2 + Math.random() * 2, "rgba(255,255,255,0.3)");
            s[_].circle = y
        }
    }
    function l() {
        if (!("ontouchstart" in window)) {
            window.addEventListener("mousemove", h)
        }
        window.addEventListener("scroll", u)
    }
    function h(t) {
        var e = posy = 0;
        if (t.pageX || t.pageY) {
            e = t.pageX;
            posy = t.pageY
        } else if (t.clientX || t.clientY) {
            e = t.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            posy = t.clientY + document.body.scrollTop + document.documentElement.scrollTop
        }
        r.x = e;
        r.y = posy
    }
    function u() {
        if (document.body.scrollTop > e) o = false;
        else o = true
    }
    function _() {
        c();
        for (var t in s) {
            f(s[t])
        }
    }
    function c() {
        if (o) {
            n.clearRect(0, 0, t, e);
            for (var i in s) {
                if (Math.abs(m(r, s[i])) < 2e3) {
                    s[i].active = .2;
                    s[i].circle.active = .6
                } else if (Math.abs(m(r, s[i])) < 2e4) {
                    s[i].active = .1;
                    s[i].circle.active = .3
                } else if (Math.abs(m(r, s[i])) < 5e4) {
                    s[i].active = .07;
                    s[i].circle.active = .1
                } else if (Math.abs(m(r, s[i])) < 2e5) {
                    s[i].active = .05;
                    s[i].circle.active = .05
                } else {
                    s[i].active = 0;
                    s[i].circle.active = 0
                }
                p(s[i]);
                s[i].circle.draw()
            }
        }
        requestAnimationFrame(c)
    }
    function f(t) {
        TweenLite.to(t, 1 + 1 * Math.random(), {
            x: t.originX - 50 + Math.random() * 100,
            y: t.originY - 50 + Math.random() * 100,
            ease: Circ.easeInOut,
            onComplete: function() {
                f(t)
            }
        })
    }
    function p(t) {
        if (!t.active) return;
        for (var e in t.closest) {
            n.beginPath();
            n.moveTo(t.x, t.y);
            n.lineTo(t.closest[e].x, t.closest[e].y);
            n.strokeStyle = "rgba(156,217,249," + t.active + ")";
            n.stroke()
        }
    }
    function d(t, e, i) {
        var s = this;
        (function() {
            s.pos = t || null;
            s.radius = e || null;
            s.color = i || null
        })();
        this.draw = function() {
            if (!s.active) return;
            n.beginPath();
            n.arc(s.pos.x, s.pos.y, s.radius, 0, 2 * Math.PI, false);
            n.fillStyle = "rgba(255,255,255," + s.active + ")";
            n.fill()
        }
    }
    function m(t, e) {
        return Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2)
    }
})();