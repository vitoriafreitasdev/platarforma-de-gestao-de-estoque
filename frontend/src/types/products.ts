import type { JSX } from "react/jsx-runtime"

export type ProductsProps = 
    {
        map(arg0: (p: ProductsProps) => JSX.Element): import("react").ReactNode
        _id: string,
        name: string,
        unitsAvailable: number,
        priceUnit: number,
        isAvailable: boolean
    }
