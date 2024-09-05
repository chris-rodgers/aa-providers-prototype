export interface PriceBreakdown {
    items: PriceBreakdownItem[];
    total: number;
};

export type PriceBreakdownItem = { name: string, price: number }
