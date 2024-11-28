import {orient2d} from 'robust-predicates'

export default function pointInPolygon(p, polygon) {
    let i
    let ii
    let k = 0
    let f
    let u1
    let v1
    let u2
    let v2
    let currentP
    let nextP

    const [x, y] = p

    const numContours = polygon.length
    for (i = 0; i < numContours; i++) {
        ii = 0
        const contour = polygon[i]
        const contourLen = contour.length - 1

        currentP = contour[0]
        if (currentP[0] !== contour[contourLen][0] &&
            currentP[1] !== contour[contourLen][1]) {
            throw new Error('First and last coordinates in a ring must be the same')
        }

        u1 = currentP[0] - x
        v1 = currentP[1] - y

        for (ii; ii < contourLen; ii++) {
            nextP = contour[ii + 1]

            u2 = nextP[0] - x
            v2 = nextP[1] - y

            if (v1 === 0 && v2 === 0) {
                if ((u2 <= 0 && u1 >= 0) || (u1 <= 0 && u2 >= 0)) return 0
            } else if ((v2 >= 0 && v1 < 0) || (v2 < 0 && v1 >= 0)) {
                f = orient2d(u1, u2, v1, v2, 0, 0)
                if (f === 0) return 0
                if ((f > 0 && v2 > 0 && v1 <= 0) || (f < 0 && v2 <= 0 && v1 > 0)) k++
            }
            currentP = nextP
            v1 = v2
            u1 = u2
        }
    }

    if (k % 2 === 0) return false
    return true
}
