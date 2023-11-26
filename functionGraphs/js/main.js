window.onload = function () {
    WIN = {
        LEFT: -10,
        BOTTOM: -10,
        WIDTH: 20,
        HEIGHT: 20
    }

    const funcs = [];

    const ZOOMSTEP = 0.2;
    let canMove = false;

    const ui = new UI({ addFunction, delFunction });

    const graph = new Graph({
        id: 'canvas',
        width: 900,
        height: 900,
        WIN,
        callBacks: { wheel, mouseup, mouseleave, mousedown, mousemove }
    })

    function addFunction(f, num, color = 'green', width = 2) {
        funcs[num] = {
            f,
            color: color,
            width: width
        };
        render();
    }
    
    function delFunction(num) {
        funcs[num] = null;
        render();
    }

    function mouseup() {
        canMove = false;
    }

    function mouseleave() {
        canMove = false;
    }

    function mousedown() {
        canMove = true;
    }

    function mousemove(event) {
        if (canMove) {
            WIN.LEFT -= graph.sx(event.movementX);
            WIN.BOTTOM -= graph.sy(event.movementY);
            render()
        }
    }

    function wheel(event) {
        let delta;
        if (event.wheelDelta > 0) {
            delta = -ZOOMSTEP;
        } else {
            delta = +ZOOMSTEP;
        }
        if (WIN.WIDTH && WIN.HEIGHT < 2) {
            delta += ZOOMSTEP;
        }
        WIN.WIDTH += delta;
        WIN.HEIGHT += delta;
        WIN.LEFT -= delta / 2;
        WIN.BOTTOM -= delta / 2;
        render();
    }

    // const getIntegral = (f,a,b) => {
    //     const dx = (b-a) / 1000;
    //     let x = a;
    //     let s = 0;
    //     while (x <= b) {
    //         s += (Math.abs(f(x)) + Math.abs(f(x + dx) / 2 * dx));
    //     } x += dx;
    //     return s;
    // }

    // function getZero(f, a, b, eps = 0.0001) {
    //     if (f(a) * f(b) > 0) 
    //         return null;
    //     if (f(a) === 0) return a;
    //     if (f(b) === 0) return b;
    //     if (Math.abs(f(a) - f(b)) <= eps)
    //         return (a + b) / 2;
    //     const half = (a + b) / 2;
    //     if (f(a) * f(half) <= 0)
    //         return getZero(f, a, half, eps);
    //     if (f(half) * f(b) <= 0)
    //         return getZero(f, half, b, eps);
    // }

    // function getZeros(f, n = 50, eps = 1) {
    //     const segments = [];
    //     const dx = WIN.WIDTH / n;
    //     let a = WIN.LEFT;
    //     let b = WIN.LEFT;
    //     while (b <= WIN.WIDTH + WIN.LEFT) {
    //         b += dx;
    //         if (f(a) * f(b) < 0) {
    //             if ((Math.abs(f(a)) + Math.abs(f(b))) < eps) {
    //                 segments.push({a, b});
    //             }
    //             a = b;
    //         }
    //     }
    //     return segments.map(({a, b}) => getZero(f,a,b));
    // }

    function printOXY() {
        for (let i = 1; i < WIN.LEFT + WIN.WIDTH; i++) {
            graph.line(
                i, WIN.BOTTOM + WIN.HEIGHT,
                i, WIN.BOTTOM, '#FFFFFF', 1
            );
        }
        for (let i = 1; i < WIN.BOTTOM + WIN.HEIGHT; i++) {
            graph.line(
                WIN.LEFT, i,
                WIN.LEFT + WIN.WIDTH, i, '#FFFFFF', 1
            );
        }
        for (let i = -1; i > WIN.LEFT; i--) {
            graph.line(
                i, WIN.BOTTOM + WIN.HEIGHT,
                i, WIN.BOTTOM, '#FFFFFF', 1
            );
        }
        for (let i = -1; i > WIN.BOTTOM; i--) {
            graph.line(
                WIN.LEFT, i,
                WIN.LEFT + WIN.WIDTH, i, '#FFFFFF', 1
            );
        }
        graph.line(WIN.LEFT, 0, WIN.LEFT + WIN.WIDTH, 0, 'black');
        graph.line(0, WIN.BOTTOM, 0, WIN.BOTTOM + WIN.HEIGHT, 'black');
    }

    const printFunction = (f, color, width, n = 200) => {
        let x = WIN.LEFT;
        let dx = WIN.WIDTH / n;
        while (x <= WIN.WIDTH + WIN.LEFT) {
            graph.line(x, f(x), x + dx, f(x + dx), color, width);
            x += dx;
        }
    }

    // function printZeros(f, n = 50, eps = 1, color = '#00f') {
    //     const zeros = getZeros(f, n, eps);
    //     zeros.forEach((zero) => {
    //         if (zero !== null) {
    //             graph.point(zero, f(zero), color, size);
    //         }
    //     });
    // }

    // function printIntegral(f,a,b) {
    //     if (a !== b) {
    //         const dx = (b - a) / 100;
    //         let x = a;
    //         const points = [{x,y:0}];
    //         while (x <= b) {
    //             points.push({x,y:f(x)});
    //             x += dx;
    //         }
    //         points.push({x:b,y:0});
    //         graph.polygon(points);
    //     }
    // }

    function render() {
        graph.clear();
        printOXY();
        funcs.forEach(func => func && printFunction(func.f, func.color, func.width));
    }
    render();

}