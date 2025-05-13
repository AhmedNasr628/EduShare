<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Gate;

class PostController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum')->except(['index', 'show']);
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
       return Post::with('user')->orderBy('title', 'asc')->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
       $fields= $request->validate([
            'title' => 'required|string|max:255',
            'body' => 'required|string',
            'type' => 'required|in:pdf,mp4,ppt',
            'file' => 'required|file|mimes:pdf,mp4,ppt,pptx',
            'image_path' => 'nullable|image',
            'course_id' => 'required|exists:courses,id',
        ]);
        $fields['user_id'] = $request->user()->id;

        if ($request->hasFile('file')) {
            $fields['file_path'] = $request->file('file')->store('files', 'public');
        }
        $post = $request->user()->posts()->create($fields);
       return  ['post'=>$post];
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        return  ['post'=>$post , 'user'=>$post->user];
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post)
    {
        Gate::authorize('modify', $post);
        $fields= $request->validate([
            'title' => 'required|string|max:255',
            'body' => 'required|string',
            'type' => 'required|in:pdf,mp4,ppt',
            'file' => 'required|file|mimes:pdf,mp4,ppt,pptx',
            'image_path' => 'nullable|image',
            'course_id' => 'required|exists:courses,id',
        ]);
        $fields['user_id'] = $request->user()->id;
        if ($request->hasFile('file')) {
            if ($post->file_path && Storage::disk('public')->exists($post->file_path)) {
                Storage::disk('public')->delete($post->file_path);
            }
            $fields['file_path'] = $request->file('file')->store('files', 'public');
        }
        $post -> update($fields);
       return  ['post'=>$post];
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        Gate::authorize('modify', $post);
        $post->delete();
        return ['message' => 'Post deleted successfully'];
    }
}
