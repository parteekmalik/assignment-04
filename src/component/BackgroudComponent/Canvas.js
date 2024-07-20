// Particle animation
export default class ParticleAnimation {
    constructor(el, { quantity = 30, staticity = 5, ease = 50, ParticleSize = [20, 20] } = {}) {
        this.canvas = el;
        if (!this.canvas) return;
        this.canvasContainer = this.canvas.parentElement;
        this.context = this.canvas.getContext("2d");
        this.dpr = window.devicePixelRatio || 1;
        this.settings = {
            quantity: quantity,
            staticity: staticity,
            ease: ease,
            ParticleSize: ParticleSize,
        };
        this.circles = [];
        this.mouse = {
            x: 0,
            y: 0,
        };
        this.canvasSize = {
            w: 0,
            h: 0,
        };
        this.onMouseMove = this.onMouseMove.bind(this);
        this.initCanvas = this.initCanvas.bind(this);
        this.resizeCanvas = this.resizeCanvas.bind(this);
        this.drawCircle = this.drawCircle.bind(this);
        this.drawParticles = this.drawParticles.bind(this);
        this.remapValue = this.remapValue.bind(this);
        this.animate = this.animate.bind(this);
        this.init();
    }

    init() {
        this.initCanvas();
        this.animate();
        window.addEventListener("resize", this.initCanvas);
        window.addEventListener("mousemove", this.onMouseMove);
        // this.checkCircleInsideCirlce({ x: this.circles[0].x, y: this.circles[0].y + 1, size: this.circles[0].size + 2 });
    }
    getRandomRange(x, y, { isFloorde = false } = {}) {
        const final = Math.random() * (y - x) + x;
        if (isFloorde) Math.floor(final);
        return final;
    }
    initCanvas() {
        this.resizeCanvas();
        this.drawParticles();
    }

    onMouseMove(event) {
        const { clientX, clientY } = event;
        const rect = this.canvas.getBoundingClientRect();
        const { w, h } = this.canvasSize;
        const x = clientX - rect.left - w / 2;
        const y = clientY - rect.top - h / 2;
        const inside = x < w / 2 && x > -(w / 2) && y < h / 2 && y > -(h / 2);
        if (inside) {
            this.mouse.x = x;
            this.mouse.y = y;
        }
    }

    resizeCanvas() {
        this.circles.length = 0;
        this.canvasSize.w = this.canvasContainer.offsetWidth;
        this.canvasSize.h = this.canvasContainer.offsetHeight;
        this.canvas.width = this.canvasSize.w * this.dpr;
        this.canvas.height = this.canvasSize.h * this.dpr;
        this.canvas.style.width = this.canvasSize.w + "px";
        this.canvas.style.height = this.canvasSize.h + "px";
        this.context.scale(this.dpr, this.dpr);
    }

    circleParams() {
        const x = this.getRandomRange(0, this.canvasSize.w);
        const y = this.getRandomRange(0, this.canvasSize.h);
        const translateX = 0;
        const translateY = 0;
        const size = this.getRandomRange(this.settings.ParticleSize[0], this.settings.ParticleSize[1], { isFloorde: true });
        const targetAlpha = parseFloat((Math.random() * 0.6 + 0.1).toFixed(1));
        const dx = (Math.random() - 0.5) * this.settings.staticity;
        const dy = (Math.random() - 0.5) * this.settings.staticity;
        const magnetism = 0.1 + Math.random() * 4;
        const fillStyle = `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`;
        const isgrow = this.circles.length % 2 === 0 ? true : false;
        return { x, y, translateX, translateY, size, targetAlpha, dx, dy, magnetism, fillStyle, isgrow };
    }

    circleWithoutCollision() {
        let circle;
        do {
            circle = this.circleParams();
        } while (this.checkCollisionCircle(circle) || this.isTouchingBoundry(circle));
        return circle;
    }

    checkCollisionCircle({ x, y, size }, ignore = []) {
        for (let i = 0; i < this.circles.length; i++) {
            if (ignore.includes(i)) continue;
            const circle = this.circles[i];
            const distanceBtw = Math.pow(Math.pow(circle.x - x, 2) + Math.pow(circle.y - y, 2), 1 / 2);
            if (distanceBtw <= size + circle.size) {
                // console.log(distanceBtw, circle.size, size);
                return i;
            }
        }
        return false;
    }

    drawCircle(circle, update = false) {
        const { x, y, translateX, translateY, size, fillStyle } = circle;
        this.context.translate(translateX, translateY);
        // this.context.filter = "blur(3rem)";
        // this.context.globalCompositeOperation = "hard-light";

        this.context.beginPath();
        this.context.arc(x, y, size, 0, 2 * Math.PI);
        this.context.fillStyle = fillStyle;
        this.context.fill();
        this.context.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
        if (!update) {
            this.circles.push(circle);
        }
    }

    clearContext() {
        this.context.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h);
    }

    drawParticles() {
        this.clearContext();
        const particleCount = this.settings.quantity;
        for (let i = 0; i < particleCount; i++) {
            const circle = this.circleWithoutCollision();
            this.drawCircle(circle);
        }
    }

    // This function remaps a value from one range to another range
    remapValue(value, start1, end1, start2, end2) {
        const remapped = ((value - start1) * (end2 - start2)) / (end1 - start1) + start2;
        return remapped > 0 ? remapped : 0;
    }

    isTouchingBoundry(circle) {
        const edge = [
            circle.x + circle.translateX, // distance from left edge
            this.canvasSize.w - circle.x - circle.translateX, // distance from right edge
            circle.y + circle.translateY, // distance from top edge
            this.canvasSize.h - circle.y - circle.translateY, // distance from bottom edge
        ];

        if (edge[0] < 0) return { dx: circle.dx * -1, dy: circle.dy, x: 0, y: circle.y };
        else if (edge[1] < 0) return { dx: circle.dx * -1, dy: circle.dy, x: this.canvasSize.w - 0, y: circle.y };
        else if (edge[2] < 0) return { dx: circle.dx, dy: circle.dy * -1, x: circle.x, y: 0 };
        else if (edge[3] < 0) return { dx: circle.dx, dy: circle.dy * -1, x: circle.x, y: this.canvasSize.h - 0 };
        return false;
    }

    animate() {
        this.clearContext();
        const removeCircles = new Set();

        for (let i = 0; i < this.circles.length; i++) {
            let circle = this.circles[i];

            if (circle.size >= this.settings.ParticleSize[1] || circle.size <= this.settings.ParticleSize[0]) {
                circle.isgrow = !circle.isgrow;
            }
            circle.x += circle.dx;
            circle.y += circle.dy;
            const sizeChange = (this.settings.ParticleSize[1] - this.settings.ParticleSize[0]) / 120;
            circle.size = circle.size + (circle.isgrow ? sizeChange : sizeChange * -1);
            // Effect due to hover
            // circle.translateX += (this.mouse.x / (this.settings.staticity / circle.magnetism) - circle.translateX) / this.settings.ease;
            // circle.translateY += (this.mouse.y / (this.settings.staticity / circle.magnetism) - circle.translateY) / this.settings.ease;

            // circle gets out of the canvas
            const updatedValues = this.isTouchingBoundry(circle);
            if (typeof updatedValues !== "boolean") {
                // console.log("toching border before", circle);
                [circle.x, circle.y, circle.dx, circle.dy] = [updatedValues.x, updatedValues.y, updatedValues.dx, updatedValues.dy];
                // console.log("toching border after", circle, updatedValues);
            }
            const isCollided = this.checkCollisionCircle({ ...circle }, [i]);
            if (isCollided) {
                // console.log(isCollided);
                // removeCircles.add(i);
                // removeCircles.add(isCollided);
            }
        }
        // console.log(this.circles, removeCircles);
        removeCircles.forEach((index) => {
            this.circles[index] = this.circleWithoutCollision();
        });
        this.circles.forEach((circle) => this.drawCircle({ ...circle, x: circle.x, y: circle.y, translateX: circle.translateX, translateY: circle.translateY, alpha: circle.alpha }, true));
        window.requestAnimationFrame(this.animate);
    }
}
