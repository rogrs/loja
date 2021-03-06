import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { Localidades } from './localidades.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class LocalidadesService {

    private resourceUrl = SERVER_API_URL + 'api/localidades';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/localidades';

    constructor(private http: Http) { }

    create(localidades: Localidades): Observable<Localidades> {
        const copy = this.convert(localidades);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(localidades: Localidades): Observable<Localidades> {
        const copy = this.convert(localidades);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Localidades> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    search(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceSearchUrl, options)
            .map((res: any) => this.convertResponse(res));
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to Localidades.
     */
    private convertItemFromServer(json: any): Localidades {
        const entity: Localidades = Object.assign(new Localidades(), json);
        return entity;
    }

    /**
     * Convert a Localidades to a JSON which can be sent to the server.
     */
    private convert(localidades: Localidades): Localidades {
        const copy: Localidades = Object.assign({}, localidades);
        return copy;
    }
}
