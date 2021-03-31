import Base from "./Base"
import query from "./query"

// Allow Base to be accessed via urbanup.Base
Object.defineProperty(query, 'Base', { value: Base })

export = query