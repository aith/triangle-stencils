let can;
let canw = 700;
let canh = 700;

class Triangle {
    constructor(A, B, C, parent, speed, lerpDist, isLargest) {
        this.A = A
        this.B = B
        this.C = C
        this.parent = parent
        this.speed = speed
        this.lerpDist = lerpDist
        this.isLargest = isLargest
    }
}

let uni_speed = 0.03;
let trih = 173.205080757
let parent = new Triangle([0, 200], [200, 200], [100, 200-trih], 0, uni_speed, 0, 0)

let keep1 = [];
let keep2 = [];
let extra1;
let extra2;
let keep1bools = [];
let keep2bools = [];
function generateTriangles() {
    for(let i = 0; i < 3; i++) {
        keep1.push(new Triangle(parent.A.slice(), parent.B.slice(), parent.C.slice(), parent, uni_speed, 0, 0));
    }
    for(let i = 0; i < 3; i++) {
        keep2.push(new Triangle(parent.A.slice(), parent.B.slice(), parent.C.slice(), parent, uni_speed, 0, 0));
    }
    extra1 = new Triangle(parent.A.slice(), parent.B.slice(), parent.C.slice(), parent, uni_speed, 0, 0);
    extra2 = new Triangle(parent.A.slice(), parent.B.slice(), parent.C.slice(), parent, uni_speed, 0, 0);
    
}

let a = false, b = false, c = false;
function resetBools() {
    a = false;
    b = false;
    c = false;
}

function setup() {
    can = createCanvas(canh, canw)
    frameRate(3)
    generateTriangles()
}

let bools = [a, b, c]
let extra1b = false;
let extra2b = false;
let iterations = 25; // do this per triangle

function draw() {
    // fill(255-frameCount*10)
    const dist = trih;
    const triw = 200;
    for(let i = 0; i < 3; i++) {
        if(i == 0) { a = true; }
        if(i == 1) { b = true; }
        if(i == 2) { c = true; }
        moveTriangle(keep1[i])
        translate(0,i*dist)
        drawTriangle(keep1[i])
        translate(0,-i*dist)
        resetBools()
    }
    for(let i = 0; i < 3; i++) {
        if(i == 0) { a = true; b = true; }
        if(i == 1) { b = true; c = true; }
        if(i == 2) { c = true; a = true; }
        moveTriangle(keep2[i])
        translate(2*triw, i*dist)
        drawTriangle(keep2[i])
        translate(2*-triw, -i*dist)
        resetBools()
    }
    // top mid
    c = true;
    extra1b = true;
    translate(triw, 0)
    moveTriangle(extra1)
    drawTriangle(extra1)
    translate(-triw, 0)
    extra1b = false;
    resetBools()
    // bot mid
    c = true;
    extra2b = true;
    translate(triw, 2*trih)
    moveTriangle(extra2)
    drawTriangle(extra2)
    translate(-triw, -2*trih)
    extra2b = false;
    // mid mid
    a = true; b = true; c = true;
    translate(triw, trih)
    moveTriangle(parent)
    drawTriangle(parent)
    translate(-triw, -trih)
    // translate(-triw, -trih)
    resetBools()
    if(frameCount > iterations) noLoop()
}

function moveTriangle(tri) {
        let Ax = tri.A[0], Ay = tri.A[1]
        let Bx = tri.B[0], By = tri.B[1]
        let Cx = tri.C[0], Cy = tri.C[1]
        if(a){
            tri.A[0] = lerp(Ax, Bx, tri.lerpDist)
            tri.A[1] = lerp(Ay, By, tri.lerpDist)
        }
        if(b){
            tri.B[0] = lerp(Bx, Cx, tri.lerpDist)
            if (!extra2b) tri.B[1] = lerp(By, Cy, tri.lerpDist)
        }
        if(c){
            if (!extra1b) tri.C[0] = lerp(Cx, Ax, tri.lerpDist)
            if (!extra2b) tri.C[1] = lerp(Cy, Ay, tri.lerpDist)
        }
        tri.lerpDist += tri.speed
        tri.lerpDist = tri.lerpDist % 1;
}

function drawTriangle(tri) {
    beginShape()
    vertex(tri.A[0], tri.A[1])
    vertex(tri.B[0], tri.B[1])
    vertex(tri.C[0], tri.C[1])
    endShape(CLOSE)
}
