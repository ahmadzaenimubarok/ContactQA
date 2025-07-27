<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Contact Form</title>
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
</head>
<body class="bg-gray-100 flex items-center justify-center min-h-screen">
    <div class="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 class="text-2xl font-semibold text-gray-800 mb-6 text-center">Contact Us</h2>

        @if(session('success'))
            <div class="mb-4 p-3 rounded bg-green-100 text-green-700">
                {{ session('success') }}
            </div>
        @endif

        @if($errors->any())
            <div class="mb-4 p-3 rounded bg-red-100 text-red-700">
                <ul class="list-disc list-inside">
                    @foreach($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif

        <form action="{{ route('contact.submit') }}" method="POST" class="space-y-4">
            @csrf

            <div>
                <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
                <input type="text" id="name" name="name" value="{{ old('name') }}"
                       class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-400"
                       required>
            </div>

            <div>
                <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" id="email" name="email" value="{{ old('email') }}"
                       class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-400"
                       required>
            </div>

            <div>
                <label for="message" class="block text-sm font-medium text-gray-700">Message</label>
                <textarea id="message" name="message" rows="4"
                          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-400"
                          required>{{ old('message') }}</textarea>
            </div>

            <div class="text-right">
                <button type="submit"
                        class="inline-block px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                    Send
                </button>
            </div>
        </form>
    </div>
</body>
</html>
