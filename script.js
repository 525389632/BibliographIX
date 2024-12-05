document.addEventListener('DOMContentLoaded', function() {
    const referenceType = document.getElementById('referenceType');
    const generateBtn = document.getElementById('generate');
    const copyBtn = document.getElementById('copy');
    const resultDiv = document.getElementById('result');

    const fieldsMap = {
        '期刊': 'journalFields',
        '专著': 'bookFields',
        '学位论文': 'thesisFields',
        '报纸': 'newspaperFields',
        '报告': 'reportFields',
        '论文集': 'proceedingsFields',
        '电子文献': 'webFields',
        '专利': 'patentFields'
    };

    // 切换显示不同的输入字段组
    referenceType.addEventListener('change', function() {
        Object.values(fieldsMap).forEach(id => {
            document.getElementById(id).style.display = 'none';
        });
        const selectedFields = fieldsMap[this.value];
        if (selectedFields) {
            document.getElementById(selectedFields).style.display = 'block';
        }
    });

    generateBtn.addEventListener('click', generateReference);
    copyBtn.addEventListener('click', copyToClipboard);

    function generateReference() {
        const type = referenceType.value;
        let reference = '';

        switch(type) {
            case '期刊':
                reference = generateJournalReference();
                break;
            case '专著':
                reference = generateBookReference();
                break;
            case '学位论文':
                reference = generateThesisReference();
                break;
            case '报纸':
                reference = generateNewspaperReference();
                break;
            case '报告':
                reference = generateReportReference();
                break;
            case '论文集':
                reference = generateProceedingsReference();
                break;
            case '电子文献':
                reference = generateWebReference();
                break;
            case '专利':
                reference = generatePatentReference();
                break;
            default:
                reference = '暂不支持该类型';
        }

        resultDiv.textContent = reference;
    }

    function generateJournalReference() {
        const authors = formatAuthors(document.getElementById('authors').value);
        const title = document.getElementById('title').value;
        const journal = document.getElementById('journal').value;
        const year = document.getElementById('year').value;
        const volume = document.getElementById('volume').value;
        const issue = document.getElementById('issue').value;
        const pages = document.getElementById('pages').value;

        let reference = `${authors}. ${title}[J]. ${journal}`;
        
        if (year) reference += `, ${year}`;
        if (volume) reference += `, ${volume}`;
        if (issue) reference += `(${issue})`;
        if (pages) reference += `: ${pages}`;
        
        return reference + '.';
    }

    function generateBookReference() {
        const authors = formatAuthors(document.getElementById('bookAuthors').value);
        const title = document.getElementById('bookTitle').value;
        const publisher = document.getElementById('publisher').value;
        const place = document.getElementById('publishPlace').value;
        const year = document.getElementById('publishYear').value;
        const pages = document.getElementById('bookPages').value;

        let reference = `${authors}. ${title}[M]. ${place}: ${publisher}`;
        
        if (year) reference += `, ${year}`;
        if (pages) reference += `. ${pages}`;
        
        return reference + '.';
    }

    function generateThesisReference() {
        const author = document.getElementById('thesisAuthor').value;
        const title = document.getElementById('thesisTitle').value;
        const university = document.getElementById('university').value;
        const year = document.getElementById('thesisYear').value;

        return `${author}. ${title}[D]. ${university}, ${year}.`;
    }

    function generateNewspaperReference() {
        const author = formatAuthors(document.getElementById('newspaperAuthor').value);
        const title = document.getElementById('newspaperTitle').value;
        const newspaper = document.getElementById('newspaperName').value;
        const date = document.getElementById('publishDate').value;
        const page = document.getElementById('newspaperPage').value;

        let reference = `${author}. ${title}[N]. ${newspaper}`;
        if (date) {
            const formattedDate = date.replace(/-/g, '-');
            reference += `, ${formattedDate}`;
        }
        if (page) reference += `(${page})`;
        
        return reference + '.';
    }

    function generateReportReference() {
        const author = formatAuthors(document.getElementById('reportAuthor').value);
        const title = document.getElementById('reportTitle').value;
        const place = document.getElementById('reportPlace').value;
        const institution = document.getElementById('institution').value;
        const year = document.getElementById('reportYear').value;

        return `${author}. ${title}[R]. ${place}: ${institution}, ${year}.`;
    }

    function generateProceedingsReference() {
        const author = formatAuthors(document.getElementById('proceedingsAuthor').value);
        const title = document.getElementById('proceedingsTitle').value;
        const editor = document.getElementById('editor').value;
        const proceedingsName = document.getElementById('proceedingsName').value;
        const place = document.getElementById('proceedingsPlace').value;
        const publisher = document.getElementById('proceedingsPublisher').value;
        const year = document.getElementById('proceedingsYear').value;
        const pages = document.getElementById('proceedingsPages').value;

        let reference = `${author}. ${title}[A]`;
        if (editor) reference += `. ${editor}`;
        reference += `. ${proceedingsName}[C]. ${place}: ${publisher}, ${year}`;
        if (pages) reference += `. ${pages}`;
        
        return reference + '.';
    }

    function generateWebReference() {
        const author = formatAuthors(document.getElementById('webAuthor').value);
        const title = document.getElementById('webTitle').value;
        const year = document.getElementById('webYear').value;
        const citationDate = document.getElementById('citationDate').value;
        const url = document.getElementById('url').value;

        let reference = `${author}. ${title}[EB/OL]`;
        
        if (year) {
            reference += `. (${year})`;
        }
        
        if (citationDate) {
            const formattedDate = citationDate.replace(/-/g, '-');
            reference += ` [${formattedDate}]`;
        }
        
        if (url) {
            reference += `. ${url}`;
        }
        
        return reference + '.';
    }

    function generatePatentReference() {
        const author = formatAuthors(document.getElementById('patentAuthor').value);
        const title = document.getElementById('patentTitle').value;
        const country = document.getElementById('patentCountry').value;
        const number = document.getElementById('patentNumber').value;
        const date = document.getElementById('patentDate').value;

        let reference = `${author}. ${title}: ${country}, ${number}[P]`;
        
        if (date) {
            const formattedDate = date.replace(/-/g, '-');
            reference += `. ${formattedDate}`;
        }
        
        return reference + '.';
    }

    function formatAuthors(authors) {
        return authors
            .split(';')
            .map((author, index, array) => {
                author = author.trim();
                
                // 处理英文作者名
                if (/[a-zA-Z]/.test(author)) {
                    const parts = author.split(' ').filter(part => part); // 移除空字符串
                    if (parts.length > 1) {
                        // 获取姓氏（最后一个部分）
                        const lastName = parts.pop();
                        
                        // 处理名字缩写（其余部分）
                        const initials = parts.map(part => part[0].toUpperCase()).join(' ');
                        
                        // 如果是第四个及以后的作者，且不是最后一个，则用"et al"替代
                        if (index >= 3 && index < array.length - 1) {
                            return 'et al';
                        }
                        
                        // 返回格式化后的作者名: "Yu H B"
                        return `${lastName} ${initials}`;
                    }
                }
                return author;
            })
            .filter((author, index, array) => {
                // 如果已经有"et al"，则移除后续作者
                if (array.includes('et al')) {
                    return index <= array.indexOf('et al');
                }
                return true;
            })
            .join(', ');
    }

    function copyToClipboard() {
        const text = resultDiv.textContent;
        navigator.clipboard.writeText(text).then(() => {
            alert('已复制到剪贴板！');
        }).catch(err => {
            console.error('复制失败：', err);
        });
    }
}); 