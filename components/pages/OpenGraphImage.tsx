// Renders the Open Graph image used on the home page

export const width = 1200
export const height = 630

export function OpenGraphImage(props: { title: string }) {
  const { title } = props
  return (
    <div
      style={{
        display: 'flex',
        height: '100%',
        width: '100%',
        paddingLeft: 120,
        paddingRight: 120,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        flexWrap: 'nowrap',
        backgroundColor: 'white',
        backgroundImage:
          'radial-gradient(circle at 25px 25px, lightgray 2%, transparent 0%), radial-gradient(circle at 75px 75px, lightgray 2%, transparent 0%)',
        backgroundSize: '100px 100px',
        backgroundPosition: '0 -8px, 0 -8px',
      }}
    >
      <div
        style={{
          display: 'flex',
          color: 'black',
          fontSize: 80,
          fontWeight: 'bold',
          lineHeight: 1.5,
          maxWidth: '100%',
        }}
      >
        <div style={{ background: '#fff' }}>{title}</div>
      </div>
    </div>
  )
}
