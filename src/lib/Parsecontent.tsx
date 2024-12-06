interface ContentBlock {
    type: string;
    children: { children: any[] }[];
    level?: number;
    format?: string;
  }
  
  export function parseContent(content: ContentBlock[]): string {
    return content.map((block) => {
      switch (block.type) {
        case 'heading':
          return `# ${block.children[0].text}\n\n`;
        case 'subheading':
          return `## ${block.children[0].text}\n\n`;
        case 'paragraph':
          return `${block.children[0].text}\n\n`;
        case 'list':
          return block.children.map((item) => `- ${item.children[0].text}\n`).join('') + '\n';
        case 'image':
          return `![${block.children[0].text}](${block.children[1].text})\n\n`;
        case 'link':
          return `[${block.children[0].text}](${block.children[1].text})\n\n`;
        case 'code':
          return `\`\`\`\n${block.children[0].text}\n\`\`\`\n\n`;
        default:
          return '';
      }
    }).join('');
  }