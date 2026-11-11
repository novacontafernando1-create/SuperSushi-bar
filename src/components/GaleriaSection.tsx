import React, { useState } from 'react';

interface GalleryItem {
  id: string;
  tag: string;
  tagColor: 'primary' | 'secondary';
  title: string;
  imageUrl: string;
  alt: string;
  cols: string;
  aspect: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'frame-1',
    tag: 'BALCÃO EXCLUSIVO',
    tagColor: 'secondary',
    title: 'Omakase Bar & Master Chefs',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAvUu7pTwXgcYjP4QI856irXDlrvSmQMWQJk1FqQe8vWh3cKo1duuBMQtcq-peXb3jA1TqBjAQei1HFxwF9a8sT_s-krfR4shmtV1LovcTKn2mi4XD8m3FU1zVyTXIfuycvbTLJsVkbj0clEAyTZHJqSh8i0h9ZCMVS_fHqrPGPxCABmuRRYvGCyhRGZKF-g4WE1W51iQPo5GuD734KX07key506h2KhNYMDmz_IJA',
    alt: 'Balcão Omakase futurista com iluminação cênica',
    cols: 'md:col-span-7',
    aspect: 'aspect-[16/10]',
  },
  {
    id: 'frame-2',
    tag: 'RITUAL SENSORIAL',
    tagColor: 'secondary',
    title: 'Esculturas de Gelo Criogênico',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAuJVfIn7YEJFOzDej1Ck8vDnDjW7mGiuglM9iGThOpl5aUTv5QZBOOihjcWG8KLYqLQQ63bmi1E1eZZE_lN2uqp9SaryGFWXecW9Hv_ftICYSdI5DKD3eSdZvz7EDQAeRZtXf6Mx2esXUhAKHQIfQmBC5K7B0kzGll_CDN3CD2eCziJIjM92Vhyg35oo3lkN4JFQs--rrqaigpSAN82A9OQGKSARLPookrl0StQxQ',
    alt: 'Apresentação escultural com gelo seco e névoa criogênica',
    cols: 'md:col-span-5',
    aspect: 'aspect-[4/3] md:aspect-auto',
  },
  {
    id: 'frame-3',
    tag: 'ARTE MINUCIOSA',
    tagColor: 'primary',
    title: 'Joias Marinhas em Partículas',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC9Eq0eQplG0Tx4xHSxr4Nkxy6Z076ByrjUA8YsiC8Ya67O-oDxQxJBJI26S2vOKdU956TXnR_GOPb5GClIkfSM4IatgL6-kTNG5kWPzgExvFf3jVXnw5TIg26wTgjKPuNP3d8IixTTXBojOvmBGf0Jl2_8_YF1g-wNhfHQBZwZv57oYuJrpmmQoTBtpOvzJrWnKNm2nznJ8WURhM_hG-fW8vGCwCvTcWN1AiHA_Ck',
    alt: 'Nigiris artesanais banhados por partículas de luz',
    cols: 'md:col-span-5',
    aspect: 'aspect-[4/3] md:aspect-auto',
  },
  {
    id: 'frame-4',
    tag: 'PRECISÃO DE CORTE',
    tagColor: 'primary',
    title: 'Texturas em Equilíbrio Cósmico',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6EXpbgzCAN3pXgFc_J8GS-DSI0qH0wknhawa-mv39W5zLOgBxaFwnyFVbjuVvpB6vaoHHH4P7L3LO0sUeaipVbNPKSqmQRke70lBIR9LGWNJ7TbHyKz7PSsnOJMdk3Tf-rVsD6mEtaylZjLvMduX_KzuZQCK9dozDhbU94qDnCSgW6V9rIFJUVYDg1o2eyKD6mLqS97prxaZZNwS-gTG6IHJz-YTSNyAXl4QnLkY',
    alt: 'Detalhe macro de sushis contemporâneos Wagyu',
    cols: 'md:col-span-7',
    aspect: 'aspect-[16/10]',
  },
];

export const GaleriaSection: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryItem | null>(null);

  return (
    <section className="py-margin-lg relative" id="galeria">
      <div className="max-w-[1360px] mx-auto px-margin md:px-margin-md lg:px-margin-lg">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-space-xl">
          <span className="font-label-caps text-label-caps uppercase text-secondary tracking-widest mb-space-xs font-semibold">
            IMERSÃO VISUAL
          </span>
          <h2 className="font-headline-lg text-headline-md md:text-headline-lg uppercase text-on-surface font-bold">
            ATMOSFERA & SINTONIA
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-xl mt-space-xs">
            Um espaço concebido para elevar os sentidos através da fusão entre arquitetura escura, precisão e luz cinética.
          </p>
        </div>

        {/* Modern Dynamic Masonry Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-space-md">
          {GALLERY_ITEMS.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedPhoto(item)}
              className={`${item.cols} relative group rounded-2xl overflow-hidden ${item.aspect} border border-outline-variant/30 shadow-lg cursor-pointer`}
            >
              <img
                alt={item.alt}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                src={item.imageUrl}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent opacity-75"></div>
              <div className="absolute bottom-space-md left-space-md right-space-md flex justify-between items-end">
                <div>
                  <span
                    className={`font-label-caps text-label-caps ${
                      item.tagColor === 'secondary' ? 'text-secondary' : 'text-primary'
                    } uppercase font-bold`}
                  >
                    {item.tag}
                  </span>
                  <p className="font-headline-sm text-headline-sm text-on-surface font-bold">
                    {item.title}
                  </p>
                </div>
                <span
                  className={`material-symbols-outlined text-on-surface-variant group-hover:${
                    item.tagColor === 'secondary' ? 'text-secondary' : 'text-primary'
                  } transition-colors text-[24px]`}
                >
                  visibility
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-surface-container rounded-2xl overflow-hidden border border-outline-variant/30 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-surface-container-high/80 text-on-surface flex items-center justify-center hover:bg-surface-container-highest cursor-pointer"
            >
              <span className="material-symbols-outlined text-[24px]">close</span>
            </button>
            <img
              src={selectedPhoto.imageUrl}
              alt={selectedPhoto.alt}
              className="w-full max-h-[75vh] object-cover"
            />
            <div className="p-6 bg-surface-container">
              <span className="font-label-caps text-label-caps text-primary uppercase font-bold">
                {selectedPhoto.tag}
              </span>
              <h3 className="font-headline-md text-headline-sm md:text-headline-md text-on-surface uppercase font-bold mt-1">
                {selectedPhoto.title}
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant mt-2">
                {selectedPhoto.alt}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
