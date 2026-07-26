export default function DemoFrame({ src, title = 'Interactive project demo', height = 520 }) {
  return <div className="demo-frame"><div className="demo-bar"><span /><span /><span /><small>{title}</small></div><iframe src={src} title={title} loading="lazy" style={{ height }} /></div>
}
