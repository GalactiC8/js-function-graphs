const f = x => Math.sin(x);
const g = x => Math.cos(x);
const j = x => x * x;

window.onload = function () {
    WIN = {
        LEFT: -10,
        BOTTOM: -10,
        WIDTH: 20,
        HEIGHT: 20
    }

    const funcs = [
        {
            f:(x) => Math.sin(x),
            color:'red',
            width:2
        },
        {
            g:(x) => Math.cos(x),
            color:'blue',
            width:2
        },
        {
            j:(x) => x*x,
            color:'green',
            width:2 
        }
    ];

    const ui = new UI({addFunction,delFunction});
    
    const graph = new Graph({
        id: 'canvas',
        width: 900,
        height: 900,
        WIN,
        callBacks: { wheel, mouseup, mouseleave, mousedown, mousemove }
    });

    const ZOOMSTEP = 0.2;
    let canMove = false;

    function addFunction (f,num) {
        funcs[num] = {
            f,
            color:'#f23',
            width:3
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

    function getZero(f, a, b, eps = 0.0001) {
        if (f(a) * f(b) > 0) 
            return null;
        if (f(a) === 0) return a;
        if (f(b) === 0) return b;
        if (Math.abs(f(a) - f(b)) <= eps)
            return (a + b) / 2;
        const half = (a + b) / 2;
        if (f(a) * f(half) <= 0)
            return getZero(f, a, half, eps);
        if (f(half) * f(b) <= 0)
            return getZero(f, half, b, eps);
    }

    function getZeros(f, n = 50, eps = 1) {
        const segments = [];
        const dx = WIN.WIDTH / n;
        let a = WIN.LEFT;
        let b = WIN.LEFT;
        while (b <= WIN.WIDTH + WIN.LEFT) {
            b += dx;
            if (f(a) * f(b) < 0) {
                // переделать условие для асимптод
                if ((Math.abs(f(a)) + Math.abs(f(b))) < eps) {
                    segments.push({a, b});
                }
                a = b;
            }
        }
        return segments.map(({a, b}) => getZero(f,a,b));
    }

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
        // переделать
        for (let i = -1; i > WIN.LEFT; i--) {
            graph.line(
                i,WIN.BOTTOM,
                i,WIN.LEFT, '#FFFFFF', 1
            );
        }
        for (let i = -1; i > WIN.BOTTOM; i--) {
            graph.line(
                WIN.LEFT,i,
                WIN.WIDTH,i, '#FFFFFF', 1
            );
        }
        // 
        graph.line(WIN.LEFT, 0, WIN.LEFT + WIN.WIDTH, 0, 'black');
        graph.line(0, WIN.BOTTOM, 0, WIN.BOTTOM + WIN.HEIGHT, 'black');
    }

    const printFunction = (f, n, color = `red`, width = 2) => {
        let x = WIN.LEFT;
        let dx = WIN.WIDTH / n;
        while (x <= WIN.WIDTH + WIN.LEFT) {
            graph.line(x, f(x), x + dx, f(x + dx), color, width);
            x += dx;
        }
    }

    const printZero = (x = 0) => graph.point(x, 0, '#000', 3);

    // сделать
    function printZeros(f) {
        printZero(getZero(f));
    }

    function render() {
        graph.clear();
        printOXY();
        funcs.forEach(func =>
            func && printFunction(func.f,func.color,func.width)
        );
    
        // printFunction(f, 1000, 'green', 4);
        // graph.text(-0.6, -1.2, 'y=sin(x)', 'green', '20px Georgia');

        // printFunction(g, 1000, 'purple', 4);
        // graph.text(-0.6, 1.2, 'y=cos(x)', 'purple', '20px Georgia');

        // printFunction(j, 1000, 'blue', 4);
        // graph.text(2.5, 5, 'y=x²', 'blue', '20px Georgia');

        // getZeros(f);
        // printZeros(f);
    }
    render();
}