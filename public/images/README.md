# Local Images Directory

You can place your local images in this folder or in subfolders here.

### How to use them in your code or data:
Next.js serves everything inside the `public` directory from the root URL `/`.

- If you put `my-room.jpg` inside `public/images/`:
  Reference it as: `"/images/my-room.jpg"`

- If you put `logo.png` directly inside `public/`:
  Reference it as: `"/logo.png"`

### Example in `src/data/hotelData.ts`:
```ts
featuredImage: '/images/my-tour-photo.jpg',
```
