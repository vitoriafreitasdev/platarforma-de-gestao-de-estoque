/* eslint-disable @typescript-eslint/no-explicit-any */
import type { JSX } from "react/jsx-runtime"

export type ProductsProps = 
    {
        filter(arg0: (p: any) => boolean): string[]
        src: string,
        map(arg0: (p: ProductsProps) => JSX.Element): import("react").ReactNode
        _id: string,
        name: string,
        unitsAvailable: number,
        priceUnit: number,
        isAvailable: boolean
    }
