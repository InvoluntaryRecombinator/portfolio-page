"use client";

import { useCallback, useLayoutEffect, useRef } from "react";
import gsap from "gsap";

type FleetSyncLogoProps = {
  animated?: boolean;
};

export default function FleetSyncLogo({ animated = false }: FleetSyncLogoProps) {
  const root = useRef<HTMLDivElement>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);

  const playAnimation = useCallback(() => {
    const lockup = root.current;
    if (!lockup) return;

    const innerPieces = Array.from(
      lockup.querySelectorAll<SVGPathElement>("[data-fleetsync-inner]"),
    ).reverse();
    const finalPiece = lockup.querySelector<SVGPathElement>("[data-fleetsync-final]");
    const wordmark = lockup.querySelector<HTMLElement>("[data-fleetsync-wordmark]");
    const animatedPieces = [...innerPieces, finalPiece, wordmark].filter(Boolean);

    timeline.current?.kill();
    gsap.killTweensOf(animatedPieces);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(animatedPieces, { opacity: 1 });
      return;
    }

    gsap.set(animatedPieces, { opacity: 0 });
    timeline.current = gsap
      .timeline()
      .to(innerPieces, {
        opacity: 1,
        duration: 0.15,
        stagger: 0.1,
        ease: "none",
      })
      .to(
        [finalPiece, wordmark],
        {
          opacity: 1,
          duration: 1.2,
          ease: "power2.inOut",
        },
        "-=0.3",
      );
  }, []);

  useLayoutEffect(() => {
    if (!animated) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      playAnimation();
      return;
    }

    const startTimer = window.setTimeout(playAnimation, 750);
    return () => {
      window.clearTimeout(startTimer);
      timeline.current?.kill();
    };
  }, [animated, playAnimation]);

  return (
    <div
      ref={root}
      className={`artwork artwork-fleetsync${animated ? " is-animated" : ""}`}
      role="img"
      aria-label="FleetSync nautilus logo"
    >
      <div className="fleetsync-lockup">
        <svg className="fleetsync-shell" viewBox="0 0 505 470" aria-hidden="true">
          <g transform="rotate(90 252.5 235)">
            <path
              data-fleetsync-final
              stroke="currentColor"
              fill="none"
              strokeWidth="2"
              d="m284.03 189.67s14.856-33.049 20.314-42.752 9.703-25.772 3.032-44.571-17.587-35.477-24.863-41.843-44.571 0.607-87.323 32.747-60.035 69.737-63.977 81.259-16.07 46.699-9.703 82.78 16.676 54.274 44.268 59.731 43.662-9.097 48.21-16.07 10.612-15.161 3.335-30.624-8.102-27.894-2.08-43.964 17.847-23.953 27.853-30.018c10.01-6.07 27.9-9.41 40.94-6.68z"
            />
            <path data-fleetsync-inner stroke="currentColor" fill="none" strokeWidth="2" d="m143.64 312.53s20.082 12.135 45.318 8.806c0 0 2.685 3.759 4.94 3.437 0 0 2.041-1.985 1.826-5.342 0 0 29.854-9.588 29.103-38.902 0 0 5.799 6.338 12.242 10.526s8.162 11.705 7.41 18.686-1.612 20.83-15.25 29.744-27.422 10.82-35.867 10.82c-15.78-0.02-34.68-16.53-49.72-37.79z" />
            <path data-fleetsync-inner stroke="currentColor" fill="none" strokeWidth="2" d="m193.54 354.58s23.001 0.501 41.615-14.22c0 0 2.802 1.305 4.454-0.03 0 0 0.687-2.561-1.086-5.139 0 0 19.888-20.313 5.306-43.361 0 0 7.246 0.685 14.288 1.976 5.024 0.921 12.012 6.307 14.812 10.339 3.725 5.365 8.645 17.404 1.978 31.043-6.665 13.64-16.789 21.75-23.55 25.787-12.64 7.54-35.64 3.39-57.82-6.4z" />
            <path data-fleetsync-inner stroke="currentColor" fill="none" strokeWidth="2" d="m254.13 363.3s17.903-8.827 25.295-28.81c0 0 3.783-0.555 4.426-2.349 0 0-0.652-2.271-3.182-3.396 0 0 5.795-24.838-15.859-35.488 0 0 5.82-2.898 11.765-5.239 4.241-1.671 12.021-0.872 15.997 0.875 5.293 2.323 14.555 9.16 15.744 22.68 1.191 13.521-2.781 24.468-6.067 30.729-6.14 11.71-26.78 17.99-48.12 21.01z" />
            <path data-fleetsync-inner stroke="currentColor" fill="none" strokeWidth="2" d="m306.54 342.49s8.117-14.685 5.488-33.319c0 0 2.366-1.739 2.172-3.398 0 0-0.992-1.507-3.416-1.404 0 0-7.21-21.916-28.368-21.836 0 0 3.791-6.141 7.546-10.296 2.679-2.965 10.259-4.279 14.063-4.458 5.061-0.238 16.432 2.594 22.638 12.746 6.208 10.152 7.57 19.933 7.432 26.131-0.25 11.59-11.97 25.15-27.55 35.84z" />
            <path data-fleetsync-inner stroke="currentColor" fill="none" strokeWidth="2" d="m337.18 302.41s-1.188-15.722-11.976-28.522c0 0-0.022-0.756-0.683-2.056 0 0-1.051-1.104-2.525-0.975 0 0-15.792-13.108-31.697-3.05 0 0-0.046-6.417 0.819-11.323 0.618-3.501 5.709-8.074 8.49-10.007 3.7-2.57 13.608-5.811 23.083-1.094 9.477 4.718 15.125 11.443 17.952 16.18 5.29 8.84 3.23 25.42-3.46 40.84z" />
            <path data-fleetsync-inner stroke="currentColor" fill="none" strokeWidth="2" d="m343.04 259.01s-7.135-12.766-21.286-18.536c0 0-0.314-0.63-1.382-1.422 0 0-1.322-0.439-2.524 0.363 0 0-18.524-3.675-28.12 12.337 0 0-2.177-4.208-3.374-8.769-1.418-5.401 1.365-10.746 2.976-13.692 2.142-3.92 9.313-8.852 19.201-9.315 9.89-0.461 15.832 2.117 20.078 4.802 7.92 5.01 14.1 18.01 14.42 34.23z" />
            <path data-fleetsync-inner stroke="currentColor" fill="none" strokeWidth="2" d="m328.19 221.38s-11.684-6.648-25.706-4.751c0 0-0.544-0.345-1.771-0.479 0 0-1.263 0.256-1.85 1.413 0 0-16.539 5.477-16.72 22.137 0 0-3.713-2.27-6.805-5.251-3.663-3.531-3.938-8.903-4.029-11.901-0.121-3.984 3.308-11.007 11.001-15.802 7.695-4.794 13.655-5.471 18.31-5.306 8.69 0.31 19.72 7.58 27.57 19.94z" />
            <path data-fleetsync-inner stroke="currentColor" fill="none" strokeWidth="2" d="m299.05 198.78s-12.249-0.174-22.521 7.568c0 0-0.586-0.036-1.619 0.399 0 0-0.887 0.767-0.832 1.957 0 0-10.661 11.738-3.33 25.226 0 0-3.963-0.181-7.754-1.209-4.489-1.221-7.117-5.423-8.535-7.796-1.883-3.152-2.313-10.323 1.637-17.594 3.953-7.268 8.377-10.453 12.143-12.383 7.03-3.61 19.04-2.65 30.81 3.82z" />
            <path data-fleetsync-inner stroke="currentColor" fill="none" strokeWidth="2" d="m262.22 194.37s-5.492 4.762-10.874 14.939c0 0-0.389 0.231-0.905 1.153 0 0-0.349 0.724-0.169 1.708 0 0-4.055 13.705 7.651 22.566 0 0-3.387 1.239-6.98 1.7-4.256 0.543-8.191-2.097-10.357-3.611-2.878-2.012-5.552-7.444-5.258-15 0.297-7.553 1.861-9.927 4.21-12.888 4.39-5.54 10.4-9.03 22.69-10.57z" />
            <path data-fleetsync-inner stroke="currentColor" fill="none" strokeWidth="2" d="m234.8 207.91s-2.286 5.896-2.015 15.915c0 0-0.21 0.336-0.209 1.256 0 0 0.046 0.697 0.641 1.381 0 0 2.956 12.188 16.492 14.225 0 0-2.184 2.332-4.889 4.153-3.207 2.152-7.602 1.729-10.05 1.448-3.252-0.373-7.897-3.458-11.102-9.385-3.201-5.926-3.014-8.389-2.458-11.622 1.06-6.04 4.34-11.18 13.6-17.37z" />
            <path data-fleetsync-inner stroke="currentColor" fill="none" strokeWidth="2" d="m218.89 231.13s0.887 5.376 5.528 12.655c0 0-0.01 0.343 0.398 1.02 0 0 0.344 0.495 1.095 0.735 0 0 7.625 7.687 18.735 3.156 0 0 0.025 3.331-1.209 5.882-1.465 3.02-4.749 3.787-7.576 4.915-2.665 1.063-7.486 0.967-12.527-1.982-5.037-2.949-5.987-4.854-7-7.489-1.89-4.94-1.69-10.19 2.55-18.9z" />
            <path data-fleetsync-inner stroke="currentColor" fill="none" strokeWidth="2" d="m217.15 256.2s3.068 3.859 10.029 7.408c0 0 0.141 0.279 0.769 0.62 0 0 0.497 0.227 1.214 0.052 0 0 9.571 2.42 16.653-6.614 0 0 1.474 2.646 1.581 5.283 0.123 3.128-2.22 5.342-4.033 7.62-1.709 2.149-5.683 4.425-11.08 4.526-5.394 0.104-7-0.954-8.975-2.564-3.68-3.02-5.81-7.32-6.15-16.34z" />
            <path data-fleetsync-inner stroke="currentColor" fill="none" strokeWidth="2" d="m250.41 264.63s-1.631 15.89-22.475 12.809c0 0 8.096 11.058 20.904 5.801 0 0 13.35-9.12 1.57-18.61z" />
            <path data-fleetsync-inner stroke="currentColor" fill="none" strokeWidth="2" d="m257.04 267.76s7.376 12.02-10.117 20.646c0 0 11.538 3.479 18.412-6.853 0-0.01 5.79-13.23-8.29-13.8z" />
            <path data-fleetsync-inner stroke="currentColor" fill="none" strokeWidth="2" d="m264.99 267.65s10.399 6.391-0.94 20.54c0 0 11.468-1.307 12.338-12.742 0 0 0.43-13.26-11.4-7.8z" />
            <path data-fleetsync-inner stroke="currentColor" fill="none" strokeWidth="2" d="m269.59 263.14s12.164 1.021 8.413 18.762c0 0 9.506-7.213 4.966-16.251-4.54-9.04-11.67-4.5-13.38-2.51z" />
            <path data-fleetsync-inner stroke="currentColor" fill="none" strokeWidth="2" d="m271.35 258s9.445-4.779 15.066 9.426c0 0 3.596-9.385-4.021-13.704-7.62-4.33-10.73 2.09-11.05 4.27z" />
            <path data-fleetsync-inner stroke="currentColor" fill="none" strokeWidth="2" d="m271.02 252.63s5.516-8.023 16.317 0.963c0 0-1.237-9.16-9.29-9.287-8.06-0.12-7.73 6.43-7.03 8.33z" />
            <path data-fleetsync-inner stroke="currentColor" fill="none" strokeWidth="2" d="m268.05 248.22s0.775-8.434 12.794-6.206c0 0-4.833-6.427-10.999-3.099-6.16 3.33-3.13 8.17-1.79 9.31z" />
            <path data-fleetsync-inner stroke="currentColor" fill="none" strokeWidth="2" d="m262.73 246.14s-2.808-6.784 7.313-9.926c0 0-6.303-2.98-9.69 2.063-3.39 5.05 0.89 7.53 2.38 7.87z" />
            <path data-fleetsync-inner stroke="currentColor" fill="none" strokeWidth="2" d="m259.59 247.78s-5.906-2.115-2.089-10.325c0 0-5.502 2.28-4.253 7.319 1.24 5.03 5.27 3.75 6.34 3z" />
            <path data-fleetsync-inner stroke="currentColor" fill="none" strokeWidth="2" d="m256.33 250.43s-5.238 1.144-6.192-6.537c0 0-2.954 4.147 0.234 7.232 3.19 3.09 5.53 0.34 5.96-0.69z" />
            <path data-fleetsync-inner stroke="currentColor" fill="none" strokeWidth="2" d="m255.35 254.31s-3.25 3.349-7.636-1.765c0 0-0.148 4.431 3.649 5.135 3.8 0.71 4.17-2.42 3.99-3.37z" />
            <path data-fleetsync-inner stroke="currentColor" fill="none" strokeWidth="2" d="m256.64 257.96s-0.774 3.889-6.262 2.263c0 0 1.938 3.23 4.972 1.98 3.03-1.24 1.86-3.64 1.29-4.24z" />
            <path data-fleetsync-inner stroke="currentColor" fill="none" strokeWidth="2" d="m259.08 260.18s1.553 2.583-2.364 4.475c0 0 2.741 0.826 3.808-1.429 1.06-2.25-0.83-3-1.45-3.05z" />
          </g>
        </svg>

        <span className="fleetsync-wordmark" data-fleetsync-wordmark>
          FLEETSYNC
        </span>
      </div>

      {animated && (
        <button className="fleetsync-replay" type="button" onClick={playAnimation}>
          <span aria-hidden="true">↻</span>
          <span className="sr-only">Replay FleetSync logo animation</span>
        </button>
      )}
    </div>
  );
}
