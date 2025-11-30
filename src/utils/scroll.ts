// src/utils/scroll.ts

/**
* دالة تموير سلس وحلو عشان تشتغل على كل الأجهزة التعبانة
 * @param target - العنصر اللي عاوز التمرير إليه
 * @param offset - مسافة إضافية من الأعلى (بالبكسل يا رايق )
 */
export const smoothScroll = (target: HTMLElement | null, offset: number = 0) => {
  if (!target) return;

  const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  let startTime: number | null = null;

  const animation = (currentTime: number) => {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = easeInOutQuad(timeElapsed, startPosition, distance, 600);

    window.scrollTo(0, run);
    if (timeElapsed < 600) requestAnimationFrame(animation);
  };

  const easeInOutQuad = (t: number, b: number, c: number, d: number) => {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  };

  requestAnimationFrame(animation);
};