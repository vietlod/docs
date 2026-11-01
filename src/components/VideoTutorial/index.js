import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './styles.module.css';
import Youtube from '@site/static/img/youtube.svg';

const normalizeYouTubeEmbedUrl = (rawUrl) => {
    if (!rawUrl || typeof rawUrl !== 'string') return '';
    const trimmed = rawUrl.trim();
    if (trimmed.includes('youtube.com/embed/')) return trimmed;
    try {
        const parsed = new URL(trimmed);
        if (parsed.hostname === 'youtu.be') {
            const videoId = parsed.pathname.replace(/^\/+/, '');
            const search = parsed.search || '';
            return videoId ? `https://www.youtube.com/embed/${videoId}${search}` : trimmed;
        }
        if (parsed.hostname.includes('youtube.com') && parsed.pathname === '/watch') {
            const videoId = parsed.searchParams.get('v');
            if (videoId) {
                const params = new URLSearchParams(parsed.searchParams);
                params.delete('v');
                const qs = params.toString();
                return `https://www.youtube.com/embed/${videoId}${qs ? `?${qs}` : ''}`;
            }
        }
    } catch {
        return trimmed;
    }
    return trimmed;
};

/**
 * Collapsible containing an embedded youtube video
 * @param {string} title - the title of the video 
 * @param {string} src - the youtube url (supports youtu.be, youtube.com/watch, or youtube.com/embed)
 * @returns 
 */
const VideoTutorial = ({ title, src, opened }) => {
    const { i18n } = useDocusaurusContext();
    const isEn = i18n?.currentLocale === 'en';
    const prefixLabel = isEn ? 'Video Tutorial:' : 'Video hướng dẫn:';
    const embedSrc = normalizeYouTubeEmbedUrl(src);
    return (
        <details className={styles.details} {...(opened && { open: true })}>  
         <summary className={styles.summary}><span className={styles.icon}><Youtube/></span>{prefixLabel} {title}</summary>
         <div className={styles.content}>
           <iframe className={styles.iframe} width="560" height="315" src={embedSrc} title={title || 'YouTube video player'} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
         </div>
        </details>
    );
};

export default VideoTutorial;
