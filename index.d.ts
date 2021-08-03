declare module "point-in-polygon-hao" {
    /**
     * Determines if a point is in a polygon
     *
     * @param p the point
     * @param polygon the polygon
     * @returns true if p in polygon, false if p is not in polygon, and 0 if p is on an edge of polygon
     */
    export default function pointInPolygon(p: number[], polygon: number[][][]): boolean | 0;
}
