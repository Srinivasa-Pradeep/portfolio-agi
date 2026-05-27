
'use client';

import React from 'react';
import GitHubCalendar from 'react-github-calendar';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import { useTheme } from 'next-themes';

export function GitHubContributionGraph() {
  const { resolvedTheme } = useTheme();
  const githubUsername = "srinivasa-pradeep"; 

  // Thematic colors for the calendar blocks
  const theme = {
    light: ['#f0f0f0', '#d1d5db', '#9ca3af', '#4b5563', '#1f2937'],
    dark: ['#161b22', '#30363d', '#484f58', '#8b949e', '#c9d1d9'],
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full overflow-x-auto pb-4 scrollbar-hide flex justify-center">
        <div className="min-w-[750px]">
          <GitHubCalendar 
            username={githubUsername} 
            theme={theme}
            colorScheme={resolvedTheme === 'dark' ? 'dark' : 'light'}
            blockSize={12}
            blockMargin={4}
            fontSize={14}
            renderBlock={(block, activity) => (
              React.cloneElement(block as React.ReactElement, {
                'data-tooltip-id': 'github-portfolio-tooltip',
                'data-tooltip-html': `
                  <div class="flex flex-col gap-0.5">
                    <strong class="text-sm font-bold text-foreground">${activity.count === 0 ? 'No' : activity.count} contributions</strong> 
                    <span class="text-[10px] text-muted-foreground uppercase tracking-widest">${formatDate(activity.date)}</span>
                  </div>
                `,
              })
            )}
          />
        </div>
      </div>

      <Tooltip 
        id="github-portfolio-tooltip" 
        delayShow={30}
        delayHide={0}
        className="!bg-background !border-border !border !rounded-lg !shadow-2xl !opacity-100 !px-3 !py-2 !z-[100]"
      />
      
      <div className="mt-4 flex items-center gap-2 opacity-40 hover:opacity-100 transition-opacity duration-300">
        <span className="h-px w-8 bg-muted-foreground/30" />
        <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-[0.3em]">
           GitHub Activity &bull; Interactive Timeline
        </p>
        <span className="h-px w-8 bg-muted-foreground/30" />
      </div>
    </div>
  );
}
