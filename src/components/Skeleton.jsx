import React from 'react';

const SkeletonCard = () => (
    <div className="country-card animate-fadeIn" style={{ animationDelay: '0s' }}>
        <div className="card-image-box" style={{ background: '#eee' }} />
        <div className="card-body">
            <div className="country-name" style={{ height: '1.2rem', width: '70%', background: '#eee', borderRadius: '4px' }} />
            <div className="space-y-2">
                <div style={{ height: '0.85rem', width: '50%', background: '#eee', borderRadius: '4px', marginBottom: '8px' }} />
                <div style={{ height: '0.85rem', width: '60%', background: '#eee', borderRadius: '4px', marginBottom: '8px' }} />
                <div style={{ height: '0.85rem', width: '40%', background: '#eee', borderRadius: '4px' }} />
            </div>
        </div>
    </div>
);

const SkeletonList = () => (
    <div className="country-grid">
        {[...Array(8)].map((_, i) => (
            <SkeletonCard key={i} />
        ))}
    </div>
);

export default SkeletonList;
