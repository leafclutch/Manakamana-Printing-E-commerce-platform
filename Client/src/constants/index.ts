import { Service, Template, Order } from "@/types";

export const SERVICES: Service[] = [
    {
        id: "visiting-cards",
        name: "Visiting Cards",
        description: "Premium quality business cards with crisp printing and a range of finishes to make a lasting impression.",
        minimumQuantity: 100,
        icon: "🪪",
    },
    {
        id: "pamphlets",
        name: "Pamphlets",
        description: "Vibrant, eye-catching pamphlets for promotions, events, and campaigns printed on quality paper.",
        minimumQuantity: 200,
        icon: "📄",
    },
    {
        id: "letterheads",
        name: "Letterheads",
        description: "Professional letterheads that elevate your brand with crisp logos and consistent typography.",
        minimumQuantity: 100,
        icon: "📋",
    },
    {
        id: "id-cards",
        name: "ID Cards",
        description: "Durable ID cards for employees, events, and institutions with lamination options available.",
        minimumQuantity: 50,
        icon: "🎫",
    },
    {
        id: "garment-tags",
        name: "Garment Tags",
        description: "Custom garment tags and labels for clothing brands with various size and material options.",
        minimumQuantity: 500,
        icon: "🏷️",
    },
    {
        id: "envelopes",
        name: "Envelopes",
        description: "Custom-printed envelopes for corporate correspondence, invitations, and marketing mailers.",
        minimumQuantity: 100,
        icon: "✉️",
    },
];

export const TEMPLATE_CATEGORIES = [
    "Visiting Cards",
    "Letterheads",
    "Envelopes",
    "ID Cards",
    "Garment Tags",
];

export const TEMPLATES: Template[] = [
    { id: "t1", name: "Modern Business Card 01", category: "Visiting Cards" },
    { id: "t2", name: "Modern Business Card 02", category: "Visiting Cards" },
    { id: "t3", name: "Classic Business Card", category: "Visiting Cards" },
    { id: "t4", name: "Corporate Letterhead 01", category: "Letterheads" },
    { id: "t5", name: "Elegant Letterhead", category: "Letterheads" },
    { id: "t6", name: "Standard Envelope", category: "Envelopes" },
    { id: "t7", name: "Business Envelope", category: "Envelopes" },
    { id: "t8", name: "Employee ID Card", category: "ID Cards" },
    { id: "t9", name: "Event ID Card", category: "ID Cards" },
    { id: "t10", name: "Clothing Brand Tag", category: "Garment Tags" },
    { id: "t11", name: "Premium Garment Label", category: "Garment Tags" },
];

export const PAPER_TYPES = [
    "Matte",
    "Glossy",
    "Satin",
    "Recycled",
    "Bond",
    "Art Paper",
];

export const FINISHING_OPTIONS = [
    "Standard",
    "Lamination (Glossy)",
    "Lamination (Matte)",
    "UV Coating",
    "Embossing",
    "Spot UV",
];

export const MOCK_ORDERS: Order[] = [
    {
        id: "ORD001",
        orderName: "Visiting Cards Batch",
        service: "Visiting Cards",
        quantity: 2000,
        paperType: "Matte",
        finishingOption: "Lamination (Glossy)",
        designId: "D203",
        orderType: "STANDARD",
        status: "ORDER_DELIVERED",
        date: "2026-02-15",
    },
    {
        id: "ORD002",
        orderName: "Company Letterheads",
        service: "Letterheads",
        quantity: 500,
        paperType: "Bond",
        finishingOption: "Standard",
        orderType: "STANDARD",
        status: "ORDER_PROCESSING",
        date: "2026-03-01",
    },
    {
        id: "ORD003",
        orderName: "Event Pamphlets",
        service: "Pamphlets",
        quantity: 1000,
        paperType: "Glossy",
        finishingOption: "UV Coating",
        designId: "D301",
        orderType: "CUSTOM",
        status: "ORDER_ACCEPTED",
        date: "2026-03-04",
    },
    {
        id: "ORD004",
        orderName: "Staff ID Cards",
        service: "ID Cards",
        quantity: 50,
        paperType: "Art Paper",
        finishingOption: "Lamination (Matte)",
        orderType: "STANDARD",
        status: "ORDER_PLACED",
        date: "2026-03-05",
    },
    {
        id: "ORD005",
        orderName: "Brand Envelopes",
        service: "Envelopes",
        quantity: 300,
        paperType: "Bond",
        finishingOption: "Standard",
        orderType: "STANDARD",
        status: "ORDER_DISPATCHED",
        date: "2026-02-28",
    },
];
