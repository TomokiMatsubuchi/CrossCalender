import axios from 'axios'

// 環境変数からAPIのベースURLを取得、設定されていない場合はデフォルト値を使用
const baseURL = process.env.API_URL || 'http://api:3000'

// axiosのインスタンスを作成
const instance = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// このインスタンスの使用例

// GETリクエスト
// instance.get('/path/to/resource').then(response => {
//   console.log(response.data);
// }).catch(error => {
//   console.error(error);
// });

// POSTリクエスト
// instance.post('/path/to/resource', { data: 'yourData' }).then(response => {
//   console.log(response.data);
// }).catch(error => {
//   console.error(error);
// });

// DELETEリクエスト
// instance.delete('/path/to/resource').then(response => {
//   console.log('Deleted successfully');
// }).catch(error => {
//   console.error(error);
// });

// PATCHリクエスト
// instance.patch('/path/to/resource', { data: 'newData' }).then(response => {
//   console.log('Updated successfully');
// }).catch(error => {
//   console.error(error);
// });

export default instance
