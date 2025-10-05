import json
import os
import psycopg2
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Get user profile with character stats
    Args: event with httpMethod, queryStringParameters; context with request_id
    Returns: HTTP response with user profile data
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method != 'GET':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    params = event.get('queryStringParameters') or {}
    username = params.get('username', '').strip()
    
    if not username:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Username required'})
        }
    
    database_url = os.environ.get('DATABASE_URL')
    conn = psycopg2.connect(database_url)
    cur = conn.cursor()
    
    cur.execute("""
        SELECT u.id, u.username, u.email, u.character_name, u.character_class, 
               u.character_level, u.created_at, u.last_login,
               pr.total_score, pr.pvp_kills, pr.pve_bosses_killed, 
               pr.quests_completed, pr.playtime_hours, pr.rank, pr.guild
        FROM users u
        LEFT JOIN player_ratings pr ON u.character_name = pr.player_name
        WHERE u.username = %s AND u.is_active = true
    """, (username,))
    
    user = cur.fetchone()
    
    if not user:
        cur.close()
        conn.close()
        return {
            'statusCode': 404,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'User not found'})
        }
    
    profile = {
        'id': user[0],
        'username': user[1],
        'email': user[2],
        'character_name': user[3],
        'character_class': user[4],
        'character_level': user[5],
        'created_at': user[6].isoformat() if user[6] else None,
        'last_login': user[7].isoformat() if user[7] else None,
        'stats': {
            'total_score': user[8] or 0,
            'pvp_kills': user[9] or 0,
            'pve_bosses_killed': user[10] or 0,
            'quests_completed': user[11] or 0,
            'playtime_hours': user[12] or 0,
            'rank': user[13] or None,
            'guild': user[14] or None
        }
    }
    
    cur.close()
    conn.close()
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'isBase64Encoded': False,
        'body': json.dumps({'profile': profile})
    }
