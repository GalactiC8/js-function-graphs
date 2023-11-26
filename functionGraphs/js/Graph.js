function Graph({ id, WIN, width = 300, height = 300, callBacks }) {
    let canvas;
    if (id) {
        canvas = document.getElementById(id);
    } else {
        canvas = document.createElement('canvas');
        document.querySelector('body').appendChild(canvas);
    }
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext('2d');

    const { wheel, mousemove, mouseleave, mouseup, mousedown } = callBacks;
    canvas.addEventListener('wheel', wheel);
    canvas.addEventListener('mousemove', mousemove);
    canvas.addEventListener('mouseleave', mouseleave);
    canvas.addEventListener('mouseup', mouseup);
    canvas.addEventListener('mousedown', mousedown);

    const PI2 = 2 * Math.PI;

    const xs = x => (x - WIN.LEFT) / WIN.WIDTH * canvas.width;
    const ys = y => canvas.height - (y - WIN.BOTTOM) / WIN.HEIGHT * canvas.height;

    this.sx = x => x * WIN.WIDTH / canvas.width;
    this.sy = y => -y * WIN.HEIGHT / canvas.height;

    this.clear = () => context.clearRect(0, 0, canvas.width, canvas.height);

    this.line = (x1, y1, x2, y2, color = 'red', width = 2) => {
        context.beginPath();
        context.strokeStyle = color;
        context.lineWidth = width;
        context.moveTo(xs(x1), ys(y1));
        context.lineTo(xs(x2), ys(y2));
        context.stroke();
        context.closePath();
    }

    this.point = (x, y, color = '#fff', size = 2) => {
        context.beginPath();
        context.strokeStyle = '#000';
        context.fillStyle = color;
        context.arc(xs(x), ys(y), size, 0, PI2)
        context.stroke();
        context.fill();
        context.closePath();
    }

    // this.text = (x, y, text, color = `blue`, font = `20px Georgia`) => {
    //     context.beginPath();
    //     context.font = font;
    //     context.fillStyle = color;
    //     context.fillAlign = 'center';
    //     context.fillText(text || "", xs(x), ys(y));
    //     context.stroke();
    //     context.closePath();
    // }
}