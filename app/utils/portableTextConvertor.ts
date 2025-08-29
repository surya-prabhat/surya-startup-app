import { PortableTextBlock, PortableTextSpan } from "@portabletext/types";

export const convertHtmlToPortableText = (html: string): PortableTextBlock[] => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const blocks: PortableTextBlock[] = [];

    const nodes = doc.body.childNodes;
    let listLevel = 0;
    let listType: 'bullet' | 'number' | undefined = undefined;

    const createBlock = (style: string = 'normal', listItem?: 'bullet' | 'number', level?: number): PortableTextBlock => {
        return {
            _type: 'block',
            _key: `${Date.now()}-${Math.random()}`,
            style: style,
            listItem: listItem,
            level: level,
            children: [],
        };
    };

    let currentBlock: PortableTextBlock | null = createBlock();

    const processNode = (node: Node, parentMarks: string[] = [], blockStyle: string = 'normal') => {
        if (node.nodeType === Node.TEXT_NODE) {
            if (node.textContent?.trim()) {
                const span: PortableTextSpan = {
                    _type: 'span',
                    _key: `${Date.now()}-${Math.random()}`,
                    text: node.textContent,
                    marks: parentMarks,
                };
                if (currentBlock) {
                    currentBlock.children.push(span);
                }
            }
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as HTMLElement;
            const newMarks = [...parentMarks];
            let newBlockStyle = blockStyle;

            // Handle marks
            if (['STRONG', 'B'].includes(element.tagName)) {
                newMarks.push('strong');
            }
            if (['EM', 'I'].includes(element.tagName)) {
                newMarks.push('em');
            }
            if (['U'].includes(element.tagName)) {
                newMarks.push('underline');
            }

            // Handle block-level elements
            if (['P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6'].includes(element.tagName)) {
                newBlockStyle = element.tagName.toLowerCase();
                
                // If there's content in the current block, push it
                if (currentBlock && currentBlock.children.length > 0) {
                    blocks.push(currentBlock);
                }
                currentBlock = createBlock(newBlockStyle);
                
                // Process the children of this block element
                element.childNodes.forEach(child => processNode(child, newMarks, newBlockStyle));
                
                // Push the new block to the array after processing its children
                if (currentBlock.children.length > 0) {
                    blocks.push(currentBlock);
                }
                currentBlock = null; // Reset for the next top-level node
            } else if (element.tagName === 'UL' || element.tagName === 'OL') {
                listLevel++;
                listType = element.tagName === 'UL' ? 'bullet' : 'number';
                element.childNodes.forEach(child => processNode(child, newMarks, newBlockStyle));
                listLevel--;
                if (listLevel === 0) listType = undefined;
            } else if (element.tagName === 'LI') {
                // If there's content in the current block, push it
                if (currentBlock && currentBlock.children.length > 0) {
                    blocks.push(currentBlock);
                }
                // Create a new block for the list item
                currentBlock = createBlock('normal', listType, listLevel);
                
                // Process the children of this list item
                element.childNodes.forEach(child => processNode(child, newMarks, newBlockStyle));
                
                // Push the new block to the array after processing its children
                if (currentBlock.children.length > 0) {
                    blocks.push(currentBlock);
                }
                currentBlock = null; // Reset for the next top-level node
            } else {
                // Process children of inline elements with accumulated marks
                element.childNodes.forEach(child => processNode(child, newMarks, newBlockStyle));
            }
        }
    };

    doc.body.childNodes.forEach(node => processNode(node, []));

    // Handle any remaining text that wasn't part of a block-level element
    if (currentBlock && currentBlock.children.length > 0) {
        blocks.push(currentBlock);
    }
    
    // Fallback for an empty document
    if (blocks.length === 0) {
        blocks.push(createBlock());
    }

    return blocks;
};