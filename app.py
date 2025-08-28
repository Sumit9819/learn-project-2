from flask import Flask, render_template, request

app = Flask(__name__)

# A dictionary to store video data
video_data = {
    'sports-highlight': {
        'redirect_url': 'https://otieu.com/4/9786651',
        'video_path': 'https://sportypie.com/static/videos/sports-highlight.mp4',
        'title': 'Incredible Game-Winning Shot',
        'description': 'Watch the last-second shot that won the championship!'
    },
    'funny-cat-video': {
        'redirect_url': 'https://example.com/more-funny-videos',
        'video_path': 'https://sportypie.com/static/videos/funny-cat-video.mp4',
        'title': 'Hilarious Cat Compilation',
        'description': 'This cat is taking over the internet!'
    }
}

# The main URL to share
@app.route('/<video_id>')
def main_page(video_id):
    if video_id in video_data:
        data = video_data[video_id]
        player_url = f"{request.url_root}player/{video_id}"
        return render_template(
            'redirect_page.html',
            redirect_url=data['redirect_url'],
            player_url=player_url,
            title=data['title'],
            description=data['description'],
            twitter_handle="@SportyPie"
        )
    return "Page not found.", 404

# The video player for Twitter
@app.route('/player/<video_id>')
def video_player(video_id):
    if video_id in video_data:
        data = video_data[video_id]
        return render_template(
            'video_player.html',
            video_path=data['video_path'],
            redirect_url=data['redirect_url']
        )
    return "Video not found.", 404

if __name__ == '__main__':
    app.run(debug=True)
