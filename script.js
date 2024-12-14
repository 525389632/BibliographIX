document.addEventListener('DOMContentLoaded', function() {
    // 获取所有必要的元素
    const typeSelector = document.querySelector('.type-selector');
    const referenceFields = document.querySelectorAll('.reference-fields');
    const generateBtn = document.getElementById('generate');
    const resultDiv = document.getElementById('result');
    const copyBtn = document.getElementById('copy');

    // 文献类型切换处理
    typeSelector.addEventListener('click', function(e) {
        if (e.target.tagName === 'LI') {
            typeSelector.querySelectorAll('li').forEach(li => li.classList.remove('active'));
            e.target.classList.add('active');
            referenceFields.forEach(field => field.style.display = 'none');
            
            const type = e.target.getAttribute('data-type');
            const targetFields = document.getElementById(type === '期刊' ? 'journalFields' :
                                                      type === '专著' ? 'bookFields' :
                                                      type === '论文集' ? 'proceedingsFields' :
                                                      type === '学位论文' ? 'thesisFields' :
                                                      type === '报告' ? 'reportFields' :
                                                      type === '报纸' ? 'newspaperFields' :
                                                      type === '标准' ? 'standardFields' :
                                                      type === '专利' ? 'patentFields' : 'webFields');
            targetFields.style.display = 'block';
        }
    });

    // 生成引用格式
    generateBtn.addEventListener('click', function() {
        const activeType = typeSelector.querySelector('.active').getAttribute('data-type');
        let result = '';

        switch (activeType) {
            case '期刊':
                result = generateJournalReference();
                break;
            case '专著':
                result = generateBookReference();
                break;
            case '论文集':
                result = generateProceedingsReference();
                break;
            case '学位论文':
                result = generateThesisReference();
                break;
            case '报告':
                result = generateReportReference();
                break;
            case '报纸':
                result = generateNewspaperReference();
                break;
            case '标准':
                result = generateStandardReference();
                break;
            case '专利':
                result = generatePatentReference();
                break;
            case '电子文献':
                result = generateWebReference();
                break;
        }

        resultDiv.textContent = result;
        
        // 清空当前显示的输入框
        clearCurrentInputs();
    });

    // 清空输入框函数
    function clearCurrentInputs() {
        // 获取当前活动的文献类型
        const activeType = typeSelector.querySelector('.active').getAttribute('data-type');
        
        // 根据文献类型获取对应的字段组
        const activeFields = document.getElementById(
            activeType === '期刊' ? 'journalFields' :
            activeType === '专著' ? 'bookFields' :
            activeType === '论文集' ? 'proceedingsFields' :
            activeType === '学位论文' ? 'thesisFields' :
            activeType === '报告' ? 'reportFields' :
            activeType === '报纸' ? 'newspaperFields' :
            activeType === '标准' ? 'standardFields' :
            activeType === '专利' ? 'patentFields' : 'webFields'
        );

        // 清空该字段组中的所有输入框
        if (activeFields) {
            const inputs = activeFields.querySelectorAll('input');
            inputs.forEach(input => {
                input.value = '';
            });
        }
    }

    // 期刊引用格式生成函数
    function generateJournalReference() {
        const authors = formatAuthors(document.getElementById('authors').value.trim());
        const title = document.getElementById('title').value.trim();
        const journal = document.getElementById('journal').value.trim();
        const year = document.getElementById('year').value.trim();
        const volume = document.getElementById('volume').value.trim();
        const issue = document.getElementById('issue').value.trim();
        const pages = document.getElementById('pages').value.trim();

        let reference = `${authors}. ${title}[J]. ${journal}`;
        
        if (year) {
            reference += `, ${year}`;
        }
        if (volume) {
            reference += `, ${volume}`;
            if (issue) {
                reference += `(${issue})`;
            }
        }
        if (pages) {
            reference += `: ${pages}`;
        }
        reference += '.';

        return reference;
    }

    // 专著引用格式生成函数
    function generateBookReference() {
        const authors = formatAuthors(document.getElementById('bookAuthors').value.trim());
        const title = document.getElementById('bookTitle').value.trim();
        const publisher = document.getElementById('publisher').value.trim();
        const place = document.getElementById('publishPlace').value.trim();
        const year = document.getElementById('publishYear').value.trim();
        const pages = document.getElementById('bookPages').value.trim();

        let reference = `${authors}. ${title}[M]. ${place}: ${publisher}, ${year}`;
        if (pages) {
            reference += `: ${pages}`;
        }
        reference += '.';

        return reference;
    }

    // 论文集引用格式生成函数
    function generateProceedingsReference() {
        const authors = formatAuthors(document.getElementById('proceedingsAuthor').value.trim());
        const procName = document.getElementById('proceedingsName').value.trim();
        const place = document.getElementById('proceedingsPlace').value.trim();
        const publisher = document.getElementById('proceedingsPublisher').value.trim();
        const year = document.getElementById('proceedingsYear').value.trim();

        let reference = `${authors}. ${procName}[C]. ${place}: ${publisher}, ${year}.`;
        
        return reference;
    }

    // 学位论文引用格式生成函数
    function generateThesisReference() {
        const author = formatAuthors(document.getElementById('thesisAuthor').value.trim());
        const title = document.getElementById('thesisTitle').value.trim();
        const place = document.getElementById('thesisPlace').value.trim();
        const university = document.getElementById('university').value.trim();
        const year = document.getElementById('thesisYear').value.trim();

        return `${author}. ${title}[D]. ${place}: ${university}, ${year}.`;
    }

    // 报告引用格式生成函数
    function generateReportReference() {
        const author = formatAuthors(document.getElementById('reportAuthor').value.trim());
        const title = document.getElementById('reportTitle').value.trim();
        const place = document.getElementById('reportPlace').value.trim();
        const institution = document.getElementById('institution').value.trim();
        const year = document.getElementById('reportYear').value.trim();

        return `${author}. ${title}[R]. ${place}: ${institution}, ${year}.`;
    }

    // 报纸引用格式生成函数
    function generateNewspaperReference() {
        const author = formatAuthors(document.getElementById('newspaperAuthor').value.trim());
        const title = document.getElementById('newspaperTitle').value.trim();
        const newspaper = document.getElementById('newspaperName').value.trim();
        const date = document.getElementById('publishDate').value.trim();
        const page = document.getElementById('newspaperPage').value.trim();

        return `${author}. ${title}[N]. ${newspaper}, ${date}(${page}).`;
    }

    // 标准引用格式生成函数
    function generateStandardReference() {
        const author = formatAuthors(document.getElementById('standardAuthor').value.trim());
        const name = document.getElementById('standardName').value.trim();
        const number = document.getElementById('standardNumber').value.trim();
        const place = document.getElementById('standardPlace').value.trim();
        const publisher = document.getElementById('standardPublisher').value.trim();
        const year = document.getElementById('standardYear').value.trim();
        const pages = document.getElementById('standardPages').value.trim();
        const accessDate = document.getElementById('standardAccessDate').value.trim();

        let reference = `${author}. ${name}: ${number}[S`;
        
        // 如果有访问日期，添加/OL标识
        if (accessDate) {
            reference += '/OL';
        }
        
        reference += `]. ${place}: ${publisher}, ${year}`;
        
        // 添加页码
        if (pages) {
            reference += `: ${pages}`;
        }
        
        // 添加访问日期（如果有）
        if (accessDate) {
            reference += `[${accessDate}]`;
        }
        
        reference += '.';
        
        return reference;
    }

    // 专利引用格式生成函数
    function generatePatentReference() {
        const author = formatAuthors(document.getElementById('patentAuthor').value.trim());
        const title = document.getElementById('patentTitle').value.trim();
        const number = document.getElementById('patentNumber').value.trim();
        const date = document.getElementById('patentDate').value.trim();

        return `${author}. ${title}: ${number}[P]. ${date}.`;
    }

    // 电子文献引用格式生成函数
    function generateWebReference() {
        const author = formatAuthors(document.getElementById('webAuthor').value.trim());
        const title = document.getElementById('webTitle').value.trim();
        const year = document.getElementById('webYear').value.trim();
        const citationDate = document.getElementById('citationDate').value.trim();
        const url = document.getElementById('url').value.trim();

        let reference = `${author}. ${title}[EB/OL]`;
        
        // 添加出版年份（如果有）
        if (year) {
            reference += `. (${year})`;
        }
        
        // 添加引用日期
        if (citationDate) {
            reference += `[${citationDate}]`;
        }
        
        // 添加URL
        if (url) {
            reference += `. ${url}`;
        }
        
        reference += '.';

        return reference;
    }

    // 复制到剪贴板功能
    copyBtn.addEventListener('click', function() {
        const result = resultDiv.textContent;
        if (result) {
            navigator.clipboard.writeText(result).then(() => {
                const span = copyBtn.querySelector('span');
                const originalText = span.textContent;
                span.textContent = '已复制';
                setTimeout(() => {
                    span.textContent = originalText;
                }, 2000);
            });
        }
    });

    // 英文名字格式化函数
    function formatAuthorName(author) {
        // 如果包含中文字符，直接返回
        if (/[\u4e00-\u9fa5]/.test(author)) {
            return author;
        }

        // 去除多余的空格
        author = author.trim();

        // 处理"姓,名"格式 (Einstein, Albert)
        if (author.includes(',')) {
            const [lastName, firstName] = author.split(',').map(part => part.trim());
            const initials = firstName.split(' ')
                .map(name => name.charAt(0).toUpperCase())
                .join(' ');
            return `${lastName} ${initials}`;
        }

        // 处理已经包含点号的格式 (A. Einstein)
        if (author.includes('.')) {
            const parts = author.split(' ');
            const lastName = parts[parts.length - 1];
            const initials = parts.slice(0, -1)
                .map(part => part.charAt(0).toUpperCase())
                .join(' ');
            return `${lastName} ${initials}`;
        }

        // 处理普通格式 (Albert Einstein 或 James Robert Smith)
        const parts = author.split(' ');
        const lastName = parts[parts.length - 1];
        const initials = parts.slice(0, -1)
            .map(name => name.charAt(0).toUpperCase())
            .join(' ');
        return `${lastName} ${initials}`;
    }

    // 处理多个作者的函数
    function formatAuthors(authors) {
        // 按逗号分隔作者
        return authors.split(',')
            .map(author => formatAuthorName(author.trim()))
            .join(', ');
    }
}); 