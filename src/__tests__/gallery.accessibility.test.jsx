import { render } from '@testing-library/react'
import GalleryGrid from '../components/Gallery/GalleryGrid'
import axe from 'axe-core'

test('Gallery has no obvious accessibility violations (basic axe run)', async () => {
  const { container } = render(<GalleryGrid items={[]} onOpen={() => {}} />)
  const results = await new Promise((resolve, reject) => {
    axe.run(container, {}, (err, result) => {
      if (err) reject(err); else resolve(result);
    })
  })
  expect(results.violations.length).toBe(0)
})

