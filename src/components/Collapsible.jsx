import { useState } from 'react'

export default function Collapsible({ title, children }) {
  const [open, setOpen] = useState(false)
  return <div className="collapsible"><button type="button" onClick={() => setOpen(!open)} aria-expanded={open}>{open ? '−' : '+'} {title}</button>{open && <div className="collapsible-body">{children}</div>}</div>
}
