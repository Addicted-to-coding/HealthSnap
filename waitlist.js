// Babel will transform this JSX code
const WaitlistForm = () => {
const [email, setEmail] = React.useState('');
const [status, setStatus] = React.useState('idle');
const [message, setMessage] = React.useState('');

// Replace this URL with your Google Form submission URL
const GOOGLE_FORM_URL = 'https://forms.gle/jWfXfvqeF3NvN9cX7';
// Replace this with your Google Form field ID
const GOOGLE_FORM_EMAIL_ID = 'entry.605265976';

const handleSubmit = async (e) => {
e.preventDefault();
if (!email || status === 'loading') return;

setStatus('loading');

try {
    // Create a hidden form and submit it
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = GOOGLE_FORM_URL;
    form.target = '_blank';
    
    const emailInput = document.createElement('input');
    emailInput.name = GOOGLE_FORM_EMAIL_ID;
    emailInput.value = email;
    
    form.appendChild(emailInput);
    
    const iframe = document.createElement('iframe');
    iframe.name = 'hidden_iframe';
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
    
    document.body.appendChild(form);
    form.submit();
    
    setTimeout(() => {
    document.body.removeChild(form);
    document.body.removeChild(iframe);
    }, 1000);

    setStatus('success');
    setMessage('You\'re on the waitlist! We\'ll notify you when HealthSnap launches.');
    setEmail('');
} catch (error) {
    setStatus('error');
    setMessage('Something went wrong. Please try again.');
}
};

return React.createElement('div', { className: 'w-full max-w-md' },
React.createElement('form', { onSubmit: handleSubmit, className: 'space-y-4' },
    React.createElement('div', { className: 'relative' },
    React.createElement('input', {
        type: 'email',
        value: email,
        onChange: (e) => setEmail(e.target.value),
        placeholder: 'Enter your email for early access',
        className: 'w-full p-4 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
        disabled: status === 'loading' || status === 'success',
        required: true
    })
    ),
    React.createElement('button', {
    type: 'submit',
    disabled: status === 'loading' || status === 'success',
    className: 'w-full bg-blue-600 text-white p-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2'
    }, status === 'loading' ? 'Joining...' : 'Join Waitlist')
),
status === 'success' && React.createElement('div', {
    className: 'mt-4 p-4 bg-green-900/50 rounded-lg flex items-start gap-2 border border-green-800'
}, React.createElement('p', { className: 'text-green-200' }, message)),
status === 'error' && React.createElement('div', {
    className: 'mt-4 p-4 bg-red-900/50 rounded-lg flex items-start gap-2 border border-red-800'
}, React.createElement('p', { className: 'text-red-200' }, message))
);
};

// Initialize the component
const waitlistContainer = document.getElementById('waitlistRoot');
if (waitlistContainer) {
const root = ReactDOM.createRoot(waitlistContainer);
root.render(React.createElement(WaitlistForm));
}