// SOLID principles applied: Single Responsibility Principle
// Each function has a single responsibility

// Styles management
function injectStyles() {
    if (document.getElementById('bug-highlight-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'bug-highlight-styles';
    style.innerHTML = `
      .bug-highlight {
        outline: 2px dashed red !important;
        position: relative;
      }
      .flag-btn {
        position: absolute;
        top: 0;
        right: 0;
        background:rgb(40, 26, 232);
        color: white;
        font-size: 12px;
        padding: 4px 8px;
        cursor: pointer;
        z-index: 9999;
        border-radius: 4px;
        border: 1px solid #0d47a1;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        transition: all 0.2s ease;
      }
      .flag-btn:hover {
        background: #0d47a1;
      }
      .flag-form {
        position: fixed;
        top: 20%;
        left: 50%;
        transform: translateX(-50%);
        background: white;
        border-radius: 8px;
        border: 1px solid #ccc;
        padding: 20px;
        z-index: 10000;
        box-shadow: 0 4px 16px rgba(0,0,0,0.2);
        width: 350px;
        font-family: Arial, sans-serif;
      }
      .flag-form textarea {
        width: 100%;
        min-height: 120px;
        padding: 10px;
        margin-bottom: 15px;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-family: inherit;
        resize: vertical;
        color: #000;
      }
      .flag-form button {
        background: #1a73e8;
        color: white;
        border: none;
        border-radius: 4px;
        padding: 10px 16px;
        font-weight: bold;
        cursor: pointer;
        transition: background 0.2s ease;
      }
      .flag-form button:hover {
        background: #0d47a1;
      }
      .flag-form-title {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 15px;
        color: #333;
      }`
    document.head.appendChild(style);
}

// Spinner animation for loading states
function injectSpinnerAnimation() {
    if (document.getElementById('spinner-animation')) return;
    
    const spinnerStyle = document.createElement('style');
    spinnerStyle.id = 'spinner-animation';
    spinnerStyle.textContent = '@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }';
    document.head.appendChild(spinnerStyle);
}

// Extract first visible text from complex elements
function extractFirstVisibleText(element) {
  const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      // Ignore whitespace and empty text
      return node.textContent.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });

  const firstTextNode = walker.nextNode();
  return firstTextNode ? firstTextNode.textContent.trim() : '';
}

// Form UI creation
function createFlagForm(target) {
    const form = document.createElement('div');
    form.className = 'flag-form';
    
    const title = createFormTitle('Report an Issue');
    const note = createTextArea('Describe the issue...');
    const buttonContainer = createButtonContainer();
    
    const cancelBtn = createCancelButton(() => removeForm(form));
    const submitBtn = createSubmitButton(() => submitReport(target, note.value, form));
    
    buttonContainer.appendChild(cancelBtn);
    buttonContainer.appendChild(submitBtn);
    
    form.appendChild(title);
    form.appendChild(note);
    form.appendChild(buttonContainer);
    document.body.appendChild(form);
}

function createFormTitle(titleText) {
    const title = document.createElement('div');
    title.className = 'flag-form-title';
    title.textContent = titleText;
    return title;
}

function createTextArea(placeholder) {
    const textarea = document.createElement('textarea');
    textarea.placeholder = placeholder;
    return textarea;
}

function createButtonContainer() {
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.justifyContent = 'flex-end';
    return container;
}

function createCancelButton(onClickHandler) {
    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = 'Cancel';
    cancelBtn.style.marginRight = '10px';
    cancelBtn.style.background = '#f1f1f1';
    cancelBtn.style.color = '#333';
    cancelBtn.onclick = onClickHandler;
    return cancelBtn;
}

function createSubmitButton(onClickHandler) {
    const submit = document.createElement('button');
    submit.textContent = 'Submit Report';
    submit.onclick = onClickHandler;
    return submit;
}

function removeForm(form) {
    document.body.removeChild(form);
}

// Report submission logic
async function submitReport(target, noteText, form) {
    const report = createReportData(target, noteText);
    const submitButton = form.querySelector('button:last-child');
    
    try {
        showLoadingState(submitButton);
        await sendReportToServer(report);
        removeForm(form);
    } catch (error) {
        handleSubmissionError(error, submitButton);
    }
}

function createReportData(target, noteText) {
    return {
        url: window.location.href,
        element_text: extractFirstVisibleText(target),
        note: noteText,
        timestamp: new Date().toISOString(),
    };
}

function showLoadingState(button) {
    button.disabled = true;
    injectSpinnerAnimation();
    button.innerHTML = '<span style="display: inline-block; width: 16px; height: 16px; border: 2px solid #fff; border-radius: 50%; border-top-color: transparent; animation: spin 1s linear infinite;"></span> Submitting...';
}

async function sendReportToServer(report) {
    const response = await fetch('http://localhost:3002/api/reports', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(report)
    });
    
    if (!response.ok) {
        throw new Error('Failed to submit report');
    }
    
    return response;
}

function handleSubmissionError(error, button) {
    console.error('Error submitting report:', error);
    button.disabled = false;
    button.textContent = 'Submit Report';
    alert('Failed to submit report. Please try again.');
}

// Flag button management
function createFlagButton(targetElement) {
    const flag = document.createElement('div');
    flag.className = 'flag-btn';
    flag.textContent = '🚩';
    flag.onclick = (e) => handleFlagButtonClick(e, targetElement);
    return flag;
}

function handleFlagButtonClick(event, targetElement) {
    event.stopPropagation();
    event.preventDefault();
    createFlagForm(targetElement);
}

function addFlagButtonOnHover(element) {
    element.addEventListener('mouseenter', () => {
        if (element.querySelector('.flag-btn')) return;
        const flagBtn = createFlagButton(element);
        element.appendChild(flagBtn);
    });
    
    element.addEventListener('mouseleave', () => {
        const flag = element.querySelector('.flag-btn');
        if (flag) element.removeChild(flag);
    });
}

// Link behavior management
function handleLinkBehavior(linkElement) {
    linkElement.addEventListener('click', (e) => {
        const flagBtn = linkElement.querySelector('.flag-btn');
        if (flagBtn) {
            e.preventDefault();
            e.stopPropagation();
            flagBtn.click();
        }
    });
}

// Element highlighting
function highlightElement(element) {
    // Skip elements inside the flag-form
    if (element.closest('.flag-form')) return;
    
    element.classList.add('bug-highlight');
    addFlagButtonOnHover(element);
    
    // Special handling for links
    if (element.tagName.toLowerCase() === 'a') {
        handleLinkBehavior(element);
    }
}

function processElements() {
    injectStyles();
    const elements = document.querySelectorAll('button, a');
    elements.forEach(highlightElement);
}

function initializeHighlighting() {
    // Add a small delay to ensure all JS has executed and dynamic elements are loaded
    setInterval(processElements, 500);
}

function highlightElements() {
    // Wait for the page to be fully loaded including all resources
    if (document.readyState === 'complete') {
        initializeHighlighting();
    } else {
        window.addEventListener('load', initializeHighlighting);
    }
}

// Initialize the application
highlightElements();