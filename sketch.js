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

let parent = new Triangle(
    [200, 400],
    [600, 400],
    [400, 400-346.410161514],
    0,
    0,
    0
)

let child = new Triangle(
    parent.A,  // these arent supposed to be referenced but they leave cool artifacts
    parent.B,
    parent.C,
    parent,
    0.05,
    0,
    0
)

function setup() {
    can = createCanvas(canh, canw)
    frameRate(20)
}

function draw() {
    // drawTriangle(parent)
    moveTriangle(child)
    drawTriangle(child)

    fill("red")
    // ellipse(child.C[0], child.C[1], 10, 10)
    fill("white")
    if(frameCount > 20) noLoop()
}

function moveTriangle(tri) {
        let Ax = tri.parent.A[0], Ay = tri.parent.A[1]
        let Bx = tri.parent.B[0], By = tri.parent.B[1]
        let Cx = tri.parent.C[0], Cy = tri.parent.C[1]
        tri.A[0] = lerp(Ax, Bx, tri.lerpDist)
        tri.A[1] = lerp(Ay, By, tri.lerpDist)
        tri.B[0] = lerp(Bx, Cx, tri.lerpDist)
        tri.B[1] = lerp(By, Cy, tri.lerpDist)
        tri.C[0] = lerp(Cx, Ax, tri.lerpDist)
        tri.C[1] = lerp(Cy, Ay, tri.lerpDist)
        // tri.A[0] = lerp(tri.parent.A[0], tri.parent.B[0], tri.lerpDist)
        // tri.A[1] = lerp(tri.parent.A[1], tri.parent.B[1], tri.lerpDist)
        // tri.B[0] = lerp(tri.parent.B[0], tri.parent.C[0], tri.lerpDist)
        // tri.B[1] = lerp(tri.parent.B[1], tri.parent.C[1], tri.lerpDist)
        // tri.C[0] = lerp(tri.parent.C[0], tri.parent.A[0], tri.lerpDist)
        // tri.C[1] = lerp(tri.parent.C[1], tri.parent.A[1], tri.lerpDist)
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
